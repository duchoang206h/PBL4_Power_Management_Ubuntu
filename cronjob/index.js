const CronJob = require('cron').CronJob;
let running = false;
const job = new CronJob(
	'*/5 * * * * *',
	async function() {
		if(running) return;
        running = true;
        // handle here

        running = false;
	},
	null,
	true,
	'utc'
);