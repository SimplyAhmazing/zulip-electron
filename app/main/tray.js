'use strict';
const path = require('path');
const electron = require('electron');
const app = require('electron').app;
const {addDomain, about} = require('./windowmanager');

let tray = null;

let APP_ICON
if (process.env.NODENV == 'development'){
    APP_ICON = path.join(process.resourcesPath, 'Icon');
} else {
    APP_ICON = path.join(__dirname, '..', '..', 'build', 'Icon');
}

const iconPath = () => {
	return APP_ICON + (process.platform === 'win32' ? '.ico' : '.png');
};

exports.create = () => {
	// Noone is using this feature. so let's hide it for now.
	// const toggleWin = () => {
	// 	if (win.isVisible()) {
	// 		win.hide();
	// 	} else {
	// 		win.show();
	// 	}
	// };
	const contextMenu = electron.Menu.buildFromTemplate([
		{
			label: 'About',
			click() {
				about();
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Change Zulip server',
			click(item, focusedWindow) {
				if (focusedWindow) {
					addDomain();
				}
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Reload',
			click(item, focusedWindow) {
				if (focusedWindow) {
					focusedWindow.reload();
				}
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Quit',
			click() {
				app.quit();
			}
		}
	]);

	tray = new electron.Tray(iconPath());
	tray.setToolTip(`${app.getName()}`);
	tray.setContextMenu(contextMenu);
};

