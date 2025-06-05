const cron = require('node-cron');
const axios = require('axios');
const { getAccessToken } = require('./zoho_token_manager');
require('dotenv').config();

// Get timezone from environment or default to Europe/Berlin
const TIMEZONE = process.env.TIMEZONE || 'Europe/Berlin';
const CHECKIN_TIME = process.env.CHECKIN_TIME || '0 9 * * 1-5'; // 9:00 AM Mon-Fri
const CHECKOUT_TIME = process.env.CHECKOUT_TIME || '0 18 * * 1-5'; // 6:00 PM Mon-Fri

async function checkInOut(isCheckIn = true) {
    try {
        const accessToken = await getAccessToken();
        const url = "https://people.zoho.eu/people/api/attendance";

        const headers = {
            "Authorization": `Zoho-oauthtoken ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded"
        };

        // Format current time as dd/MM/yyyy HH:mm:ss
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const currentTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        const payload = new URLSearchParams({
            dateFormat: "dd/MM/yyyy HH:mm:ss"
        });

        // Add either checkIn or checkOut parameter based on action
        if (isCheckIn) {
            payload.append("checkIn", currentTime);
        } else {
            payload.append("checkOut", currentTime);
        }

        const response = await axios.post(url, payload, { headers });

        const timestamp = new Date().toLocaleString();
        const action = isCheckIn ? "CHECK IN" : "CHECK OUT";

        console.log(`[${timestamp}] ${action} - Status: ${response.status}`);
        console.log(`Time sent: ${currentTime}`);
        console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);

        return response.data;

    } catch (error) {
        const timestamp = new Date().toLocaleString();
        const action = isCheckIn ? "CHECK IN" : "CHECK OUT";

        console.error(`[${timestamp}] ${action} FAILED:`, error.response?.data || error.message);
        throw error;
    }
}

// Manual functions for testing
async function checkIn() {
    return await checkInOut(true);
}

async function checkOut() {
    return await checkInOut(false);
}

// Cron job configurations
function setupCronJobs() {
    // Check in - configurable via environment
    cron.schedule(CHECKIN_TIME, async () => {
        console.log('🕘 Automated check-in triggered');
        try {
            await checkIn();
        } catch (error) {
            console.error('Automated check-in failed:', error.message);
        }
    }, {
        timezone: TIMEZONE
    });

    // Check out - configurable via environment
    cron.schedule(CHECKOUT_TIME, async () => {
        console.log('🕐 Automated check-out triggered');
        try {
            await checkOut();
        } catch (error) {
            console.error('Automated check-out failed:', error.message);
        }
    }, {
        timezone: TIMEZONE
    });

    console.log('📅 Cron jobs scheduled:');
    console.log(`   - Check-in: ${CHECKIN_TIME}`);
    console.log(`   - Check-out: ${CHECKOUT_TIME}`);
    console.log(`   - Timezone: ${TIMEZONE}`);
}

// Start the cron scheduler
function startScheduler() {
    setupCronJobs();
    console.log('🚀 Attendance scheduler started');

    // Keep the process running
    process.on('SIGINT', () => {
        console.log('\n⏹️  Stopping attendance scheduler...');
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log('\n⏹️  Received SIGTERM, stopping attendance scheduler...');
        process.exit(0);
    });
}

// Handle command line arguments for manual operations
function handleCommandLine() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        // No arguments, start the scheduler
        startScheduler();
        return;
    }

    const command = args[0].toLowerCase();

    switch (command) {
        case 'checkin':
        case 'check-in':
            console.log('🕘 Manual check-in initiated...');
            checkIn()
                .then(() => {
                    console.log('✅ Check-in completed successfully');
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('❌ Check-in failed:', error.message);
                    process.exit(1);
                });
            break;

        case 'checkout':
        case 'check-out':
            console.log('🕐 Manual check-out initiated...');
            checkOut()
                .then(() => {
                    console.log('✅ Check-out completed successfully');
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('❌ Check-out failed:', error.message);
                    process.exit(1);
                });
            break;

        case 'schedule':
        case 'start':
            startScheduler();
            break;

        case 'test':
            console.log('🧪 Testing configuration...');
            console.log(`CHECKIN_TIME: ${CHECKIN_TIME}`);
            console.log(`CHECKOUT_TIME: ${CHECKOUT_TIME}`);
            console.log(`TIMEZONE: ${TIMEZONE}`);

            // Validate cron expressions
            if (cron.validate(CHECKIN_TIME)) {
                console.log('✅ Check-in schedule is valid');
            } else {
                console.log('❌ Check-in schedule is invalid');
            }

            if (cron.validate(CHECKOUT_TIME)) {
                console.log('✅ Check-out schedule is valid');
            } else {
                console.log('❌ Check-out schedule is invalid');
            }

            // Test token retrieval
            getAccessToken()
                .then((token) => {
                    console.log('✅ Token retrieval successful');
                    console.log(`Token preview: ${token.substring(0, 10)}...`);
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('❌ Token retrieval failed:', error.message);
                    process.exit(1);
                });
            break;

        case 'help':
        case '--help':
        case '-h':
            console.log(`
📋 Zoho Attendance Manager Commands:

  node attendance_manager.js                 Start the cron scheduler (default)
  node attendance_manager.js checkin         Manual check-in
  node attendance_manager.js checkout        Manual check-out  
  node attendance_manager.js schedule        Start the cron scheduler
  node attendance_manager.js test            Test configuration and credentials
  node attendance_manager.js help            Show this help message

Environment Variables:
  CHECKIN_TIME     Cron schedule for check-in (default: 0 9 * * 1-5)
  CHECKOUT_TIME    Cron schedule for check-out (default: 0 18 * * 1-5)
  TIMEZONE         Timezone for schedules (default: Europe/Berlin)
            `);
            process.exit(0);
            break;

        default:
            console.error(`❌ Unknown command: ${command}`);
            console.log('Use "node attendance_manager.js help" for available commands');
            process.exit(1);
    }
}

// Export functions
module.exports = {
    checkIn,
    checkOut,
    checkInOut,
    startScheduler,
    setupCronJobs
};

// Run if this file is executed directly
if (require.main === module) {
    handleCommandLine();
}