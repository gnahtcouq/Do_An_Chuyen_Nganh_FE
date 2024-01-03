import React, {Component} from 'react'
import {connect} from 'react-redux'
import aboutImage from '../../../assets/about.png'

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Đôi điều về Pet Cưng</div>
        <div className="section-about-content">
          <div className="content-left">
            <img src={aboutImage} alt="" className="bg-image" />
          </div>
          <div className="content-right">
            <p>
              Pet Cưng ra đời với mong muốn mang lại cho khách hàng sự chuyên
              nghiệp, uy tín mang nét đẹp hoa mỹ mà chúng tôi đem lại sự trải
              nghiệm tốt nhất cho thú cưng của chúng ta. Với nhiều năm kinh
              nghiệm trong ngành dịch vụ thú cưng bao gồm: Spa thú cưng, Khách
              sạn thú cưng, Dịch vụ thú cưng tại nhà,... Đến với Pet Cưng bạn sẽ
              tìm được mọi thứ bạn cần cho thú cưng nhà mình.
              <br />
              <br />
              Với nhiều năm kinh nghiệm trong lĩnh vực spa cho thú cưng thì từ
              lâu Pet Cưng đã trở thành một trong những đơn vị được yêu thích
              tại TPHCM nói riêng và trên cả nước nói chung. Với hệ thống trang
              thiết bị hiện đại nhất và tốt nhất cùng với đội ngũ nhân viên được
              đào tạo bài bản thì Pet Cưng luôn mang đến cho thú cưng của bạn
              một trải nghiệm tuyệt vời nhất.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
