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
      {
        name: 'menu.admin.manage-admin',
        link: '/system/user-admin'
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
