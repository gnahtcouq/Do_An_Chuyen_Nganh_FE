export const adminMenu = [
  {
    //quản lý người dùng
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage'
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux'
      },
      {
        name: 'menu.admin.manage-staff',
        link: '/system/user-staff'
        // subMenus: [
        //   {name: 'menu.admin.manage-staff', link: '/system/user-manage'},
        //   {name: 'menu.admin.manage-staff', link: '/system/user-manage'}
        // ]
      },
      // ,
      // {
      //   name: 'menu.admin.manage-admin',
      //   link: '/system/user-admin'
      // }
      {
        //quản lý Lịch hẹn
        name: 'menu.staff.manage-schedule',
        link: '/staff/manage-schedule'
      }
    ]
  },
  {
    //quản lý phòng spa
    name: 'menu.admin.manage-room',
    menus: [
      {
        name: 'menu.admin.manage-room',
        link: '/system/manage-room'
      }
    ]
  }
]

export const staffMenu = [
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        // quản lý lịch hẹn
        name: 'menu.staff.manage-schedule',
        link: '/staff/manage-schedule'
      },
      {
        // quản lý khách hàng đặt lịch
        name: 'menu.staff.manage-customer',
        link: '/staff/manage-customer'
      }
    ]
  }
]
