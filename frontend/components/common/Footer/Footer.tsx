import React from "react";
import s from "./Footer.module.css";
import cn from "classnames";
import Container from "../../ui/Container/Container";
import Link from "next/link";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiYoutubeFill,
} from "react-icons/ri";

const Footer: React.FC = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className="px-5 grid grid-cols-2 md:grid-cols-12 gap-8 pt-20 md:pb-20 transition-colors">
          <div className="col-span-1 md:col-span-2">
            <h3 className={s.title}>Chăm sóc khách hàng</h3>
            <ul className="flex flex-initial flex-col md:flex-1 ">
              <li className={s.menu}>
                <Link href="/page/thanh-toan">Thanh Toán</Link>
              </li>
              <li className={s.menu}>
                <Link href="/page/phi-van-chuyen">Phí Vận Chuyển</Link>
              </li>
              <li className={s.menu}>
                <Link href="/page/tra-hang-hoan-tien">Trả Hàng & Hoàn Tiền</Link>
              </li>
              <li className={s.menu}>
                <Link href="/page/chinh-sach-bao-hanh">Chính Sách Bảo Hành</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-3">
            <h3 className={s.title}>về HAPE</h3>
            <ul className="flex flex-initial flex-col md:flex-1">
              <li className={s.menu}>
                <Link href="/page/about-us">Giới thiệu HAPE</Link>
              </li>
              <li className={s.menu}>
              
                <Link href="/page/chinh-sach-bao-mat">Chính sách bảo Mật</Link>
              </li>
              <li className={s.menu}>
                <Link href="/page/dieu-khoan-su-dung">Điều khoản sử dụng</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-3">
            <h3 className={s.title}>Thanh toán</h3>
            <div className={s.partnerIcons}>
              <img src="/assets/payments/visa.png" width="50px"/>
              <img src="/assets/payments/american-express.png" width="60px"/>
              <img src="/assets/payments/jcb.png" />
              <img src="/assets/payments/mastercard.svg" />
              <img src="/assets/payments/momo.png" />
              <img src="/assets/payments/vnpay.png" />
            </div>
            <h3 className={s.title}>Vận chuyển</h3>
            <div className={s.partnerIcons}>
              <img src="/assets/shippings/ghn.png" width="50px"/>
              <img src="/assets/shippings/ghtk.png" />
              <img src="/assets/shippings/jt.svg" width="60px"/>
              <img src="/assets/shippings/grab.png" />
              <img src="/assets/shippings/viettel_post.png" />
            </div>
          </div>
          <div className="col-span-3 mr-5">
            <div>
              <h3 className={s.title}>luôn dữ kết nối</h3>
              <div className="mt-10 flex items-start">
                <div className={s.iconSocial}>
                  <a
                  className={s.menu}
                  aria-label="Hape Fanpage"
                  href="https://www.facebook.com/hapevn"
                  target="_blank"
                  >
                    <RiFacebookCircleFill />
                  </a>
                  <a
                  className={s.menu}
                  aria-label="Hape on Instagram"
                  href="https://www.instagram.com/hapevn"
                  target="_blank"
                  >
                    <RiInstagramFill />
                  </a>
                  <a
                  className={s.menu}
                  aria-label="Hape on Youtube"
                  href="https://www.youtube.com/channel/UCNqfpB0YbNUOP7ggI6tXgIA"
                  target="_blank"
                  >
                    <RiYoutubeFill />
                  </a>
                </div>
              </div>
            </div>
            <div className="my-5">
              <b>
                <a href="https://www.havafy.vn" className="text-xs text-gray-700">
                  Thiết kế web và xây dựng bởi GiaUy
                </a>
              </b>
            </div>
          </div>
        </div>
      </Container>
      <div className={s.copyright}>
        <div>
          Công ty TNNH IMEX GROBAL ENTERPRSES <br />
          Địa chỉ đăng kí kinh doanh: 254 Nguyễn Hoàng ,Thủ Đức, Thành phố Hồ
          Chí Minh.
          <br />
          Giấy chứng nhận kinh doanh số 0315138097 do Sở kế hoạch và đầu tư hồ
          Chí Minh cấp ngày 29/06/2018
          <br />
          <span>@ 2017 - Bản quyền thuộc về Hape.vn</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
