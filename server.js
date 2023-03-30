
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');

const uri = 'mongodb+srv://sonnvph20319:MyIo2I4FdG2IkFtx@ss.meuyerx.mongodb.net/test';

const NhanVienModel = require('./NhanVienModel');

app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    console.log('Ket noi DB thanh cong');

    let arrNV = await NhanVienModel.find();

    console.log(arrNV);

    res.send(arrNV);
})

app.get('/add_nv', async (req, res) => {
    await mongoose.connect(uri);

    console.log('Ket noi DB thanh cong');

    let nvMoi = {
        ten: 'Nguyen Thao Trang',
        diachi: 'HN',
        luong: 12
    };

    let kq = await NhanVienModel.insertMany(nvMoi);

    console.log(kq);

    let arrNV = await NhanVienModel.find();

    res.send(arrNV);
})
//
app.get('/xoa_luong/:luong', async (req, res) => {
  await mongoose.connect(uri);

  console.log('Ket noi DB thanh cong');

  let luong = req.params.luong;

  let kq = await NhanVienModel.deleteMany({luong: luong});

  console.log(kq);

  let arrNV = await NhanVienModel.find();

  res.send(arrNV);
});

  //
//hiển thị thông tin theo id
  app.get('/nv/:id', async (req, res) => {
    await mongoose.connect(uri);
  
    console.log('Kết nối DB thành công');
  
    const { id } = req.params;
  
    const nv = await NhanVienModel.findById(id);
  
    if (!nv) {
      return res.status(404).send('Không tìm thấy nhân viên');
    }
  
    console.log(`Thông tin nhân viên: ${nv}`);
  
    res.send(nv);
  });
//  
//
app.get('/update_nv/:id', async (req, res) => {
  await mongoose.connect(uri);

  console.log('Ket noi DB thanh cong');

  let id = req.params.id;
  let updatedInfo = {
      ten: 'Nguyen Thi Mai',
      diachi: 'HCM',
      luong: 15
  };

  let kq = await NhanVienModel.findOneAndUpdate({ _id: id }, updatedInfo, { new: true });

  console.log(kq);

  let arrNV = await NhanVienModel.find();

  res.send(arrNV);
})
//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

