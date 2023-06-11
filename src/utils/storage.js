// Hàm để kiểm tra và thêm đối tượng vào mảng trong AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
export const addToAsyncStorageArray = async (key, newItem) => {
  try {

    const check = await isIssetAsyncStorageArray(key, newItem);
    if (check) return;

    let newArray = [];

    let currentArray = await AsyncStorage.getItem(key);

    if (currentArray != null) {
      // Thêm đối tượng mới vào mảng
      newArray = JSON.parse(currentArray)
      newArray.push(newItem);
    } else {
      newArray.push(newItem);
    }
    // Lưu mảng đã cập nhật trở lại vào AsyncStorage
    await AsyncStorage.setItem(key, JSON.stringify(newArray));
    console.log(`Đã thêm _id: ${newItem._id} vào mảng`)
  } catch (error) {
    console.log(error);
  }
};

export const isIssetAsyncStorageArray = async (key, itemToCheck) => {
  const currentArray = await AsyncStorage.getItem(key);
  let newArray = [];

  if (currentArray !== null) {
    // Chuyển mảng từ chuỗi JSON thành đối tượng JavaScript
    newArray = JSON.parse(currentArray);
  }

  // Kiểm tra xem đối tượng mới đã tồn tại trong mảng hay chưa
  const duplicateObject = newArray.find((item) => item._id === itemToCheck._id);

  if (duplicateObject) {
    return true;
  }
  return false;
}

export const removeFromAsyncStorageArray = async (key, itemToRemove) => {
  try {
    // Lấy mảng hiện tại từ AsyncStorage
    const currentArray = await AsyncStorage.getItem(key);
    let newArray = [];

    if (currentArray !== null) {
      // Chuyển mảng từ chuỗi JSON thành đối tượng JavaScript
      newArray = JSON.parse(currentArray);
    }

    // Kiểm tra xem đối tượng cần xóa có tồn tại trong mảng hay không
    const indexToRemove = newArray.findIndex((item) => item._id === itemToRemove._id);

    if (indexToRemove !== -1) {
      // Xóa đối tượng khỏi mảng
      newArray.splice(indexToRemove, 1);

      // Lưu mảng đã cập nhật trở lại vào AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify(newArray));
      console.log(`Đã xoá _id: ${itemToRemove._id} khỏi mảng`);
    } else {
      console.log('Không tìm thấy đối tượng trong mảng');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAsyncStorage = async (key) => {
  try {
    // Lấy mảng hiện tại từ AsyncStorage
    const currentArray = await AsyncStorage.getItem(key);

    if (currentArray == null) return null;

    return JSON.parse(currentArray);
  } catch (error) {
    console.log(error);
  }
};

export const countAsyncStorage = async (key) => {
  try {
    // Lấy mảng hiện tại từ AsyncStorage
    const currentArray = await AsyncStorage.getItem(key);
    if (currentArray != null) {
      return JSON.parse(currentArray).length;
    }
    return 0;
  } catch (error) {
    console.log(error);
  }
};