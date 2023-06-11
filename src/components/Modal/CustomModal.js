import { Animated, Modal, SafeAreaView, Text, TouchableOpacity, View, ScrollView, TextInput, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios'

import { debounce } from 'lodash'

import * as React from 'react';
import MangaService from '../../services/MangaService';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/colors';
import MaskedView from '@react-native-masked-view/masked-view';
import images from '../../assets/images';

export const CustomModal = (props) => {
    const { modalVisible, setModalVisible, comicId } = props;
    const modalOpacity = React.useRef(new Animated.Value(0)).current;
    const showAnimation = () => {
        Animated.timing(modalOpacity, {
            toValue: 1,
            duration: 50, // Thời gian hiệu ứng slide và mờ dần (có thể thay đổi)
            useNativeDriver: true,
        }).start();
    };
    const hideAnimation = () => {
        Animated.timing(modalOpacity, {
            toValue: 1,
            duration: 200, // Thời gian hiệu ứng ẩn (có thể thay đổi)
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false)
        });
    };
    React.useEffect(() => {
        if (modalVisible) {
            showAnimation();
        }
    }, [modalVisible]);

    const [comments, setComments] = React.useState([]);

    const [reloadComment, setReloadComment] = React.useState(false);

    React.useEffect(() => {
        const getComment = async () => {
            const data = await MangaService.comicComments(comicId);
            if (data) {
                setComments(data.reverse())
            }
        }

        getComment();

    }, [reloadComment])

    let [commentText, setCommentText] = React.useState('');

    const likeComment = debounce(async (idComment) => {
        const updatedComments = comments.map(comment => {
            if (comment._id === idComment) {
                return {
                    ...comment,
                    likecounts: comment.likecounts + 1
                };
            }
            return comment;
        });
        setComments(updatedComments);
        await MangaService.comicLikeComment(idComment)
    }, 1000)

    const onChangeComment = (value) => {
        if(commentText.split("\n").length - 1 < 5) {
            setCommentText(value)
        }
        else {
            const lastIndex = commentText.lastIndexOf("\n");
            const result = commentText.slice(0, lastIndex) + commentText.slice(lastIndex + 1);
            setCommentText(result)
        }
    }

    const sendComment = debounce(async () => {
        if (commentText.length > 0) {
            const data = {
                idtruyen: comicId,
                name: "Ẩn danh " + new Date().getTime().toString().slice(-4),
                email: "test@gmail.com",
                comment: commentText
            }
            const result = await MangaService.comicSendComment(data);

            if (result.success == true) {
                setReloadComment(previousState => !previousState)
                setCommentText('')
            }

        }
    }, 500)

    const imagePaths = {
        0: require('../../assets/images/avatar/0.gif'),
        1: require('../../assets/images/avatar/1.gif'),
        2: require('../../assets/images/avatar/2.gif'),
        3: require('../../assets/images/avatar/3.gif'),
        4: require('../../assets/images/avatar/4.gif'),
        5: require('../../assets/images/avatar/5.gif'),
        6: require('../../assets/images/avatar/6.gif'),
        7: require('../../assets/images/avatar/7.gif'),
        8: require('../../assets/images/avatar/8.gif'),
        9: require('../../assets/images/avatar/9.gif'),
    };

    const bgPaths = {
        0: require('../../assets/images/bg_text/0.gif'),
        1: require('../../assets/images/bg_text/1.gif'),
        2: require('../../assets/images/bg_text/2.gif'),
        3: require('../../assets/images/bg_text/3.gif'),
        4: require('../../assets/images/bg_text/4.gif'),
        5: require('../../assets/images/bg_text/5.gif'),
        6: require('../../assets/images/bg_text/6.gif'),
        7: require('../../assets/images/bg_text/7.gif'),
        8: require('../../assets/images/bg_text/8.gif'),
        9: require('../../assets/images/bg_text/9.gif'),
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={hideAnimation}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    activeOpacity={1}
                    onPress={hideAnimation}
                ></TouchableOpacity>
                <Animated.View
                    style={{
                        height: '67%',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        opacity: modalOpacity,
                        transform: [
                            {
                                translateY: modalOpacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [500, 0], // Chạy từ dưới màn hình lên (có thể thay đổi khoảng cách)
                                }),
                            },
                        ],
                    }}
                >
                    <Text style={{ textAlign: 'center', fontSize: 24, marginTop: 10, color: 'black', fontWeight: '500' }}>
                        Bình luận
                    </Text>
                    <ScrollView>
                        {comments.length == 0 ? <Text style={{ color: 'gray', textAlign: 'center', margin: 40 }}>Không tìm thấy bình luận nào</Text> : null}
                        {
                            comments.map(item => {
                                let digitsOnly = item._id.replace(/\D/g, "");
                                let lastInteger = parseInt(digitsOnly.slice(-1));
                                let image = imagePaths[lastInteger];
                                let bg = bgPaths[lastInteger];
                                return (<View key={item._id}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', margin: 6, marginBottom: 0 }}>
                                        <FastImage
                                            style={{ width: 40, height: 40, borderRadius: 9999 }}
                                            source={image}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                        <View style={{ marginLeft: 5, flex: 1 }}>
                                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 15 }}>
                                                <View style={{ marginLeft: 8, marginBottom: 8, marginRight: 4, marginTop: 3 }}>

                                                    <MaskedView

                                                        maskElement={
                                                            <View>
                                                                <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>
                                                                    {item.name}
                                                                </Text>
                                                            </View>
                                                        }>
                                                        <Image
                                                            source={bg}
                                                            style={{ width: '100%' }}
                                                        />
                                                    </MaskedView>

                                                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '400' }}>
                                                        {item.comment}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: 'transparent', flex: 1 }}></View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 40 }}>
                                        <Text onPress={async () => {
                                            await likeComment(item._id)
                                        }} style={{ color: 'gray', marginLeft: 20, fontWeight: 500 }}>Thích ({item.likecounts})</Text>
                                        <Text style={{ color: 'gray', marginLeft: 20, fontWeight: 500 }}>Trả lời ({item.replies.length})</Text>
                                        <Text style={{ color: 'gray', marginLeft: 20, fontWeight: 500 }}>{item.createdAt}</Text>
                                    </View>
                                </View>)
                            })
                        }
                    </ScrollView>
                    <View style={{ margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <FastImage
                            style={{ width: 40, height: 40, borderRadius: 9999 }}
                            source={imagePaths[4]}
                        />
                        <TextInput
                            editable
                            multiline
                            placeholder='Bình luận....'
                            placeholderTextColor="gray"
                            onChangeText={(value) => onChangeComment(value)}
                            value={commentText}
                            maxLength={150}
                            style={{ marginLeft: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgba(0, 0, 0, 0.1)', width: '75%', color: 'black', fontSize: 16, borderRadius: 15 }}
                        />
                        <View>
                            <FontAwesome onPress={async () => await sendComment()} name="send" style={{ fontSize: 28, color: commentText == "" ? 'gray' : colors.BLUE_LIGHT, margin: 10, marginBottom: 0 }} />
                            <Text style={{color: 'gray', textAlign: 'center'}}>{commentText.length}/150</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};