import axios from "../../http/axios";

/**
 * 上传图片接口
 * @param {*} file
 */
async function uploadImage(file) {
    const from = new FormData();

    from.append("file", file);
    from.append("token", 'token');
    from.append(file.name, file);

    const res = await axios.post('/upload', from);

    //   console.log(res);
    const imgUrl = res.data;
    return imgUrl;
}

export default uploadImage;