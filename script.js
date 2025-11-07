document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const giftBox = document.getElementById('giftBox');
    const message = document.getElementById('message');
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    const snowflakesContainer = document.querySelector('.snowflakes');
    const container = document.querySelector('.container');
    const themeToggle = document.getElementById('themeToggle');
    const shareBtn = document.getElementById('shareBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    const messageBtn = document.getElementById('messageBtn');
    const customModal = document.getElementById('customModal');
    const sendMessageBtn = document.getElementById('sendMessage');
    const closeModalBtn = document.getElementById('closeModal');
    const messageInput = document.getElementById('messageInput');
    
    // 状态变量
    let musicPlaying = false;
    let currentTheme = 'default';
    let snowEnabled = true;
    let particlesEnabled = true;
    let giftOpened = false;

    // 创建雪花效果
    function createSnowflakes() {
        const snowflakeSymbols = ['❄', '❅', '❆'];
        const snowflakesCount = 30;
        
        for (let i = 0; i < snowflakesCount; i++) {
            createSingleSnowflake();
        }
    }
    
    function createSingleSnowflake() {
        if (!snowEnabled) return;
        
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
    
    // 创建彩花效果
    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // 随机颜色
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机位置
            confetti.style.left = `${Math.random() * 100}%`;
            
            // 随机大小
            const size = Math.random() * 10 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // 随机动画持续时间
            const duration = Math.random() * 3 + 2;
            confetti.style.animationDuration = `${duration}s`;
            
            // 随机延迟
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            
            document.body.appendChild(confetti);
            
            // 动画结束后移除彩花
            setTimeout(() => {
                confetti.remove();
            }, (duration + parseFloat(confetti.style.animationDelay)) * 1000);
        }
    }
    
    // 打开礼物盒
    function openGiftBox() {
        if (giftOpened) return;
        giftOpened = true;
        
        // 添加打开类
        giftBox.classList.add('open');
        
        // 显示消息
        setTimeout(() => {
            message.classList.add('show');
            
            // 创建多个飘落的爱心
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createFloatingHeart(), i * 300);
            }
            
            // 创建彩花效果
            createConfetti();
            
            // 持续创建爱心
            const heartInterval = setInterval(() => {
                createFloatingHeart();
            }, 2000);
            
            // 10秒后停止创建爱心
            setTimeout(() => {
                clearInterval(heartInterval);
            }, 10000);
        }, 500);
        
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
    
    // 切换主题
    function toggleTheme() {
        const themes = ['default', 'dark-theme', 'warm-theme'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        
        // 移除当前主题
        document.body.classList.remove(currentTheme);
        
        // 添加新主题
        currentTheme = themes[nextIndex];
        document.body.classList.add(currentTheme);
        
        // 更新主题图标
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (currentTheme === 'dark-theme') {
            themeIcon.textContent = '🌙';
        } else if (currentTheme === 'warm-theme') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }
    
    // 切换雪花效果
    function toggleSnow() {
        snowEnabled = !snowEnabled;
        const snowIcon = document.querySelector('.theme-icon');
        
        if (snowEnabled) {
            snowIcon.textContent = '❄️';
            createSnowflakes();
        } else {
            snowIcon.textContent = '☀️';
            // 移除所有雪花
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(snowflake => snowflake.remove());
        }
    }
    
    // 显示自定义消息弹窗
    function showCustomMessageModal() {
        customModal.classList.add('show');
        messageInput.focus();
    }
    
    // 关闭自定义消息弹窗
    function closeCustomMessageModal() {
        customModal.classList.remove('show');
        messageInput.value = '';
    }
    
    // 发送自定义消息
    function sendCustomMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // 这里可以添加发送消息的逻辑
            alert(`你的祝福已发送：${messageText}`);
            closeCustomMessageModal();
        } else {
            alert('请输入祝福内容！');
        }
    }
    
    // 分享页面
    function sharePage() {
        if (navigator.share) {
            navigator.share({
                title: '冬日暖心礼物 🎁',
                text: '一份温暖的冬日小礼物，送给你',
                url: window.location.href
            }).then(() => {
                console.log('分享成功');
            }).catch(error => {
                console.log('分享失败:', error);
            });
        } else {
            // 如果不支持Web Share API，复制链接到剪贴板
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('链接已复制到剪贴板！');
            }).catch(error => {
                console.log('复制失败:', error);
                alert('请手动复制链接：' + window.location.href);
            });
        }
    }
    
    // 生成二维码
    function generateQRCode() {
        const qrCodeElement = document.getElementById('qrCode');
        if (qrCodeElement && typeof QRCode !== 'undefined') {
            // 清空容器
            qrCodeElement.innerHTML = '';
            
            // 生成真实二维码
            QRCode.toCanvas(qrCodeElement, window.location.href, {
                width: 120,
                height: 120,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            }, function(error) {
                if (error) {
                    console.error('二维码生成失败:', error);
                    // 如果生成失败，显示备用图标
                    qrCodeElement.innerHTML = '📱';
                    qrCodeElement.title = '扫描二维码分享页面';
                } else {
                    qrCodeElement.title = '扫描二维码分享页面';
                    qrCodeElement.style.cursor = 'pointer';
                    
                    // 添加点击事件保存二维码
                    qrCodeElement.addEventListener('click', function() {
                        const canvas = qrCodeElement.querySelector('canvas');
                        if (canvas) {
                            canvas.toBlob(function(blob) {
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = '冬日礼物二维码.png';
                                a.click();
                                URL.revokeObjectURL(url);
                            });
                        }
                    });
                }
            });
        } else {
            // 如果QRCode库未加载，显示备用图标
            qrCodeElement.innerHTML = '📱';
            qrCodeElement.title = '扫描二维码分享页面';
        }
    }
    
    // 初始化页面
    function init() {
        // 创建雪花
        createSnowflakes();
        
        // 生成二维码
        generateQRCode();
        
        // 添加礼物盒点击事件
        giftBox.addEventListener('click', openGiftBox);
        
        // 添加音乐控制点击事件
        musicControl.addEventListener('click', toggleMusic);
        
        // 添加主题切换点击事件
        themeToggle.addEventListener('click', toggleTheme);
        
        // 添加分享按钮点击事件
        shareBtn.addEventListener('click', sharePage);
        
        // 添加彩花按钮点击事件
        confettiBtn.addEventListener('click', createConfetti);
        
        // 添加消息按钮点击事件
        messageBtn.addEventListener('click', showCustomMessageModal);
        
        // 添加发送消息按钮点击事件
        sendMessageBtn.addEventListener('click', sendCustomMessage);
        
        // 添加关闭弹窗按钮点击事件
        closeModalBtn.addEventListener('click', closeCustomMessageModal);
        
        // 点击弹窗外部关闭
        customModal.addEventListener('click', function(e) {
            if (e.target === customModal) {
                closeCustomMessageModal();
            }
        });
        
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
        
        // 添加键盘快捷键
        document.addEventListener('keydown', function(e) {
            // 空格键切换音乐
            if (e.code === 'Space') {
                e.preventDefault();
                toggleMusic();
            }
            // ESC键关闭弹窗
            if (e.code === 'Escape') {
                closeCustomMessageModal();
            }
        });
        
        // 添加页面加载完成动画
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
        }, 100);
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