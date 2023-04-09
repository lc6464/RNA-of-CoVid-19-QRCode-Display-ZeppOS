import { IMAGE_STYLE } from './index.style'
let isAutoBright, brightness;

const logger = DeviceRuntimeCore.HmLogger.getLogger('NACodeDisplay');
Page({
	build() {
		logger.debug('page build invoked');
		isAutoBright = hmSetting.getScreenAutoBright();
		brightness = hmSetting.getBrightness();

		logger.debug('Is Auto Bright:', isAutoBright);
		logger.debug('Brightness:', brightness);

		// 保持亮屏、关闭自动亮度、最高亮度
		hmSetting.setBrightScreen(30);
		hmSetting.setScreenAutoBright(false);
		hmSetting.setBrightness(100);


		const img = hmUI.createWidget(hmUI.widget.IMG, {
			...IMAGE_STYLE,
		});

		let rotate = 0;

		hmApp.registerSpinEvent(function (_, degree) {
			logger.debug('Spin event:', degree);
			img.setProperty(hmUI.prop.MORE, {
				angle: rotate += degree
			});
			logger.debug('Rotate:', rotate);
			return false;
		});
	},
	onInit() {
		logger.debug('page onInit invoked');
	},

	onDestroy() {
		logger.debug('page onDestroy invoked');

		// 恢复亮度
		if (!(hmSetting.setBrightScreenCancel() === 0)) {
			logger.warn('Reset bright screen failed!');
		}

		if (!(hmSetting.setScreenAutoBright(isAutoBright) === 0)) {
			logger.warn('Reset screen auto bright failed!');
		}

		if (!(hmSetting.setBrightness(brightness) === 0)) {
			logger.warn('Reset brightness failed!');
		}
	},
});