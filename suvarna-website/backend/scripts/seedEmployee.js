import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

async function seedSuperAdmin() {
  try {
    // Check if super admin already exists
    const existingAdmin = await prisma.employee.findUnique({
      where: { email: 'admin@suvarnacapital.com' }
    });

    if (existingAdmin) {
      console.log('Super Admin already exists');
      return;
    }

    // Create super admin
    const passwordHash = await bcrypt.hash('Admin@123', 10);

    const superAdmin = await prisma.employee.create({
      data: {
        email: 'admin@suvarnacapital.com',
        passwordHash,
        firstName: 'Super',
        lastName: 'Admin',
        role: 'super_admin',
        phone: '9999999999',
        active: true
      }
    });

    console.log('Super Admin created successfully:');
    console.log('Email:', superAdmin.email);
    console.log('Password: Admin@123');
  } catch (error) {
    console.error('Error seeding super admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSuperAdmin();

