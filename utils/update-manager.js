export function checkUpdate() {
  if (wx.canIUse("getUpdateManager")) {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      console.log(res);
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启当前应用？",
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用applyUpdate应用新版本并重启
                updateManager.applyUpdate();
              }
            },
          });
        });
        // 新版本下载失败时执行
        updateManager.onUpdateFailed(() => {
          wx.showModal({
            title: "发现新版本",
            content: "请删除当前小程序，重新搜索打开...",
          });
        });
      }
    });
  } else {
    //如果小程序需要在最新的微信版本体验，如下提示
    console.log(
      "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
    );
  }
}
