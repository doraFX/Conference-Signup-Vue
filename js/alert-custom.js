/**
 * 叠层版全局 alert：不改现有 .custom-popup CSS，
 * 仅通过 JS 动态设置每条弹层的 bottom/zIndex 来实现“连点叠放”。
 */
(function() {
	const stack = []; // 当前活跃弹层列表（从底到顶）
	const BASE_BOTTOM = 60; // 你的原始 bottom 值（保持不动）
	const GAP = 4; // 每层之间的垂直间距
	const BASE_Z = 9999999999; // 基础 zIndex

	// 重新排布所有弹层（从下到上）
	function layoutStack() {
		// 计算每个弹层的 bottom：基于自身高度进行“楼层式”叠加
		let offset = 0;
		for (let i = 0; i < stack.length; i++) {
			const el = stack[i];
			const h = el.offsetHeight || 0;
			el.style.bottom = (BASE_BOTTOM + offset) + 'px';
			el.style.zIndex = BASE_Z + i;
			offset += h + GAP;
		}
	}

	// 重写全局 alert
	window.alert = function(message, {
		duration = 1200
	} = {}) {
		const popup = document.createElement('div');
		popup.className = 'custom-popup';
		popup.textContent = message;

		// 先插入到 DOM，才能测量高度
		document.body.appendChild(popup);
		stack.push(popup);

		// 用 rAF 确保样式计算后再开启动画，并做首轮排布
		requestAnimationFrame(() => {
			popup.classList.add('show');
			// 首次插入后再排布（此时能拿到 offsetHeight）
			layoutStack();
		});

		// 自动移除
		const remove = () => {
			const idx = stack.indexOf(popup);
			if (idx !== -1) stack.splice(idx, 1);
			popup.classList.remove('show');
			setTimeout(() => {
				popup.remove();
				layoutStack(); // 移除后重排剩余弹层
			}, 300); // 与 CSS 过渡时间一致
		};

		const t = setTimeout(remove, duration);

		// 点击快速关闭当前这层（不影响其它层）
		popup.addEventListener('click', () => {
			clearTimeout(t);
			remove();
		});

		return popup;
	};
})();