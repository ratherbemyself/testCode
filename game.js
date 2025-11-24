// 设计分辨率（逻辑坐标），比真实屏幕小很多，更省性能
const DESIGN_WIDTH = 360;
const DESIGN_HEIGHT = 640;

// Phaser 游戏配置
const config = {
  type: Phaser.CANVAS,  // 强制使用 Canvas，兼容性好，初始化更快
  width: DESIGN_WIDTH,
  height: DESIGN_HEIGHT,
  backgroundColor: "#f5f5dc",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 }, // 稍微大一点，看起来掉得利索
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,           // 按比例适配
    autoCenter: Phaser.Scale.CENTER_BOTH // 居中显示
  },
  render: {
    pixelArt: true,   // 关闭多余的插值，减轻渲染压力
    roundPixels: true
  },
  scene: {
    preload,
    create,
    update
  }
};

let player;

// 创建游戏实例
const game = new Phaser.Game(config);

function preload() {
  // 暂时不用加载图片，空着即可
}

function create() {
  const scene = this;

  // === 地板 ===
  const groundHeight = 40;
  const ground = scene.add.rectangle(
    DESIGN_WIDTH / 2,
    DESIGN_HEIGHT - groundHeight / 2,
    DESIGN_WIDTH,
    groundHeight,
    0x8b4513
  );
  scene.physics.add.existing(ground, true); // 静态刚体

  // === 主方块 ===
  player = scene.add.rectangle(
    DESIGN_WIDTH / 2,
    DESIGN_HEIGHT * 0.2,
    60,
    60,
    0xffcc00
  );
  scene.physics.add.existing(player);
  scene.physics.add.collider(player, ground);

  // === 点击 / 触摸屏幕：生成小方块 ===
  scene.input.on("pointerdown", (pointer) => {
    // pointer.x / pointer.y 已经是逻辑坐标（360×640 范围）
    const box = scene.add.rectangle(pointer.x, 0, 40, 40, 0x3498db);
    scene.physics.add.existing(box);

    scene.physics.add.collider(box, ground);
    scene.physics.add.collider(box, player);
  });
}

function update() {
  // 后续如果要加“判定失败”“计分”等逻辑，可以写在这里
}
