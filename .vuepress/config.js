module.exports = {
  title: '都是知识点',

  theme: 'reco',

  themeConfig: {
    sidebar: [
      {
        title: '三驾马车',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/JavaScript', 'JavaScript',],
          ['/html', 'html'],
          ['/css', 'css']
        ]
      },
      {
        title: '前端流行库',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/React', 'React'],
          ['/Vue', 'Vue'],
          ['/Taro', 'Taro'],
          '/微信小程序'
        ]
      },
      {
        title: '底层工具',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/npm',
          '/webpack'
        ]
      },
      {
        title: '网络系统',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/计算机网络',
          '/网络安全',
        ]
      },
      {
        title: '算法',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/算法',
        ]
      },
      {
        title: '其他',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/性能优化',
          '/设计模式',
        ]
      },
    ],

    subSidebar: 'auto'
  }
}
