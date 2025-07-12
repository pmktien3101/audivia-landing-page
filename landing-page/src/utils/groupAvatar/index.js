// src/utils/groupAvatar.js

export async function createGroupAvatarUrl(avatarUrls = []) {
  const size = 40;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const positions = [
    { x: size / 2, y: 10 },
    { x: 12, y: 28 },
    { x: 28, y: 28 },
  ];

  // Tải tối đa 3 ảnh
  const loadedImages = await Promise.all(
    avatarUrls.slice(0, 3).map(url => loadSafeImage(url))
  );

  const validImages = loadedImages.filter(Boolean);

  if (validImages.length === 0) {
    const fallback = await loadSafeImage('/default-avatar.png');
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(fallback, 0, 0, size, size);
    ctx.restore();
    return canvas.toDataURL('image/png');
  }

  validImages.forEach((img, i) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(positions[i].x, positions[i].y, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, positions[i].x - 10, positions[i].y - 10, 20, 20);
    ctx.restore();
  });

  return canvas.toDataURL('image/png');
}

const failedUrls = new Set();

function loadSafeImage(url) {
  return new Promise((resolve) => {
    // Chặn Google avatar
    if (!url || url.startsWith('https://lh3.googleusercontent.com/') || failedUrls.has(url)) {
      const fallback = new window.Image();
      fallback.src = '/default-avatar.png';
      fallback.onload = () => resolve(fallback);
      return;
    }

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn('Image failed to load:', url);
      failedUrls.add(url);
      const fallback = new window.Image();
      fallback.src = '/default-avatar.png';
      fallback.onload = () => resolve(fallback);
    };
    img.src = url;
  });
}
