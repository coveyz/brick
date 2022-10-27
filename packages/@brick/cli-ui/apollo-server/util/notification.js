let notification = null;

export const setNotificationCallback = (cb) => {
	notification = cb ? (_err, action) => action === 'activate' && cb() : null;
};
