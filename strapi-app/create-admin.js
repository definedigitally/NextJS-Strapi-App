const { createStrapi } = require('@strapi/strapi');
const bcrypt = require('bcryptjs');
const path = require('path');

async function run() {
    // Path to your Strapi app
    const appContext = await createStrapi(path.resolve(__dirname));

    await appContext.start();

    const email = process.env.ADMIN_EMAIL || 'admin@local.com';
    const plainPassword = process.env.ADMIN_PASSWORD || 'NewPassword123';

    // Check if the admin user already exists
    const existingUser = await appContext.db.query('admin::user').findOne({
        where: { email },
    });

    if (existingUser) {
        console.log(`❌ Admin user with email ${email} already exists.`);
        await appContext.destroy();
        return;
    }

    const password = await bcrypt.hash(plainPassword, 10);

    const superAdminRole = await appContext.db.query('admin::role').findOne({
        where: { code: 'strapi-super-admin' },
    });

    await appContext.db.query('admin::user').create({
        data: {
            firstname: 'Dev',
            lastname: 'Admin',
            email,
            password,
            isActive: true,
            roles: [superAdminRole.id],
        },
    });

    console.log('✅ New admin user created successfully.');
    await appContext.destroy();
}

run();
