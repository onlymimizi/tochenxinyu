document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const giftBox = document.getElementById('giftBox');
    const message = document.getElementById('message');
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    const snowflakesContainer = document.querySelector('.snowflakes');
    const container = document.querySelector('.container');
    
    // 音乐控制状态
    let musicPlaying = false;
    
    // 创建雪花效果
    function createSnowflakes() {
        const snowflakeSymbols = ['❄', '❅', '❆'];
        const snowflakesCount = 30;
        
        for (let i = 0; i < snowflakesCount; i++) {
            createSingleSnowflake();
        }
    }
    
    function createSingleSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // 随机选择雪花符号
        const snowflakeSymbols = ['❄', '❅', '❆'];
        snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        
        // 随机大小
        const size = Math.random() * 20 + 10;
        snowflake.style.fontSize = `${size}px`;
        
        // 随机位置
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // 随机动画持续时间
        const duration = Math.random() * 10 + 5;
        snowflake.style.animationDuration = `${duration}s`;
        
        // 随机延迟
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        // 随机透明度
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        
        snowflakesContainer.appendChild(snowflake);
        
        // 动画结束后移除雪花并创建新的
        setTimeout(() => {
            snowflake.remove();
            createSingleSnowflake();
        }, (duration + parseFloat(snowflake.style.animationDelay)) * 1000);
    }
    
    // 创建飘落的爱心
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        
        // 随机位置
        heart.style.left = `${Math.random() * 80 + 10}%`;
        
        container.appendChild(heart);
        
        // 动画结束后移除爱心
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
    
    // 打开礼物盒
    function openGiftBox() {
        // 添加打开类
        giftBox.classList.add('open');
        
        // 显示消息
        setTimeout(() => {
            message.classList.add('show');
            
            // 创建多个飘落的爱心
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createFloatingHeart(), i * 300);
            }
            
            // 持续创建爱心
            const heartInterval = setInterval(() => {
                createFloatingHeart();
            }, 2000);
            
            // 10秒后停止创建爱心
            setTimeout(() => {
                clearInterval(heartInterval);
            }, 10000);
        }, 500);
        
        // 移除点击事件
        giftBox.removeEventListener('click', openGiftBox);
        
        // 隐藏交互提示
        const hint = document.querySelector('.interaction-hint');
        hint.style.display = 'none';
    }
    
    // 切换音乐播放状态
    function toggleMusic() {
        if (musicPlaying) {
            bgMusic.pause();
            musicControl.querySelector('.music-icon').textContent = '🔇';
            musicPlaying = false;
        } else {
            // 试图播放音乐
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicControl.querySelector('.music-icon').textContent = '🎵';
                    musicPlaying = true;
                }).catch(error => {
                    console.log("音乐播放被阻止:", error);
                    // 更新UI表示音乐无法播放
                    musicControl.querySelector('.music-text').textContent = '音乐已禁用';
                });
            }
        }
    }
    
    // 初始化页面
    function init() {
        // 创建雪花
        createSnowflakes();
        
        // 添加礼物盒点击事件
        giftBox.addEventListener('click', openGiftBox);
        
        // 添加音乐控制点击事件
        musicControl.addEventListener('click', toggleMusic);
        
        // 尝试自动播放音乐（可能会被浏览器阻止）
        document.addEventListener('touchstart', function autoplayOnFirstInteraction() {
            if (!musicPlaying) {
                bgMusic.play().then(() => {
                    musicPlaying = true;
                    musicControl.querySelector('.music-icon').textContent = '🎵';
                }).catch(error => {
                    console.log("音乐播放被阻止:", error);
                });
            }
            // 移除事件监听器，只需要第一次触摸时触发
            document.removeEventListener('touchstart', autoplayOnFirstInteraction);
        }, { once: true });
        
        // 添加分享提示
        setTimeout(() => {
            if (navigator.share) {
                // 如果支持Web Share API，可以在这里添加分享按钮逻辑
                console.log("支持Web Share API");
            }
        }, 1000);
    }
    
    // 启动初始化
    init();
});

// 处理微信分享配置
function setupWeChatShare() {
    // 这里通常需要引入微信JS-SDK并配置
    // 由于无法直接在本地HTML中配置微信JS-SDK，这里只提供示例代码
    /*
    wx.config({
        debug: false,
        appId: 'YOUR_APP_ID',
        timestamp: YOUR_TIMESTAMP,
        nonceStr: 'YOUR_NONCE_STR',
        signature: 'YOUR_SIGNATURE',
        jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData'
        ]
    });
    
    wx.ready(function() {
        // 自定义"分享给朋友"及"分享到QQ"按钮的分享内容
        wx.updateAppMessageShareData({
            title: '立冬小礼物 🍂',
            desc: '一份温暖的冬日小礼物，送给你',
            link: window.location.href,
            imgUrl: 'YOUR_IMAGE_URL',
            success: function() {
                // 设置成功
            }
        });
        
        // 自定义"分享到朋友圈"及"分享到QQ空间"按钮的分享内容
        wx.updateTimelineShareData({
            title: '立冬小礼物 🍂',
            link: window.location.href,
            imgUrl: 'YOUR_IMAGE_URL',
            success: function() {
                // 设置成功
            }
        });
    });
    */
}

// 调用微信分享配置
// setupWeChatShare();