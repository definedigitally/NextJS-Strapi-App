// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const email = "admin@local.com";
    const plainPassword = "NewPassword123";

    const existingUser = await strapi.db.query("admin::user").findOne({
      where: { email },
    });

    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const superAdminRole = await strapi.db.query("admin::role").findOne({
      where: { code: "strapi-super-admin" },
    });

    if (existingUser) {
      // 🔁 Reset password
      await strapi.db.query("admin::user").update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
      });
      console.log("✅ Admin password reset successfully");
    } else {
      // 🆕 Create new super admin
      await strapi.db.query("admin::user").create({
        data: {
          firstname: "Dev",
          lastname: "Admin",
          email,
          password: hashedPassword,
          isActive: true,
          roles: [superAdminRole.id],
        },
      });
      console.log("✅ New admin user created");
    }
  },
};
