export const twillioConfig = {
	accountSId:
		process.env.TWILIO_ACCOUNT_SID ?? 'ACa5fad8f58f5dc07982665568517e8245',
	authToken:
		process.env.TWILIO_AUTH_TOKEN ?? 'deca3b742e7d951ebe1ae211eaa61d77',
	apiKey: process.env.TWILIO_API_KEY ?? 'SK8e88cd25476eef322ec63e94571c87eb',
	apiSecret:
		process.env.TWILIO_API_SECRET ?? 'VbwSwKdRZs5WmBUIq6oZVNFegZP4cdxR',
	chatServiceSId:
		process.env.TWILIO_CHAT_SERVICE_SID ?? 'IS37bb1cede7774509bd4856ef10512734',
};
