import bcrypt from 'bcrypt';
import prisma from './lib/prisma.js';

async function createTestAccounts() {
  try {
    // Create a buyer account
    const buyerPassword = 'BuyerTest2025!';
    const buyerHash = await bcrypt.hash(buyerPassword, 10);
    
    try {
      const buyer = await prisma.user.create({
        data: {
          email: 'buyer@testcompany.com',
          passwordHash: buyerHash,
          companyName: 'Test Corporate Buyer',
          firstName: 'John',
          lastName: 'Buyer',
          location: 'Mumbai',
          state: 'Maharashtra',
          mobile: '+91-9876543210'
        }
      });
      console.log('✅ Buyer Account Created:');
      console.log('   Email: buyer@testcompany.com');
      console.log('   Password: BuyerTest2025!');
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('⚠️  Buyer account already exists, skipping...');
      } else {
        throw error;
      }
    }

    // Create an employee account (agent)
    const empPassword = 'EmployeeTest2025!';
    const empHash = await bcrypt.hash(empPassword, 10);
    
    try {
      const employee = await prisma.employee.create({
        data: {
          email: 'employee@crm.com',
          passwordHash: empHash,
          firstName: 'Jane',
          lastName: 'Employee',
          role: 'agent',
          phone: '+91-9876543211'
        }
      });
      console.log('✅ Employee Account Created (Agent):');
      console.log('   Email: employee@crm.com');
      console.log('   Password: EmployeeTest2025!');
      console.log('   Role: agent');
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('⚠️  Employee account already exists, skipping...');
      } else {
        throw error;
      }
    }

    // Create a manager employee
    const managerPassword = 'ManagerTest2025!';
    const managerHash = await bcrypt.hash(managerPassword, 10);
    
    try {
      const manager = await prisma.employee.create({
        data: {
          email: 'manager@crm.com',
          passwordHash: managerHash,
          firstName: 'Mike',
          lastName: 'Manager',
          role: 'manager',
          phone: '+91-9876543212'
        }
      });
      console.log('✅ Manager Account Created:');
      console.log('   Email: manager@crm.com');
      console.log('   Password: ManagerTest2025!');
      console.log('   Role: manager');
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('⚠️  Manager account already exists, skipping...');
      } else {
        throw error;
      }
    }

    // Create a super admin employee (for CRM)
    const superAdminPassword = 'SuperAdminTest2025!';
    const superAdminHash = await bcrypt.hash(superAdminPassword, 10);
    
    try {
      const superAdmin = await prisma.employee.create({
        data: {
          email: 'superadmin@crm.com',
          passwordHash: superAdminHash,
          firstName: 'Super',
          lastName: 'Admin',
          role: 'super_admin',
          phone: '+91-9876543213'
        }
      });
      console.log('✅ Super Admin Employee Account Created:');
      console.log('   Email: superadmin@crm.com');
      console.log('   Password: SuperAdminTest2025!');
      console.log('   Role: super_admin');
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('⚠️  Super admin employee account already exists, skipping...');
      } else {
        throw error;
      }
    }

    console.log('\n✅ All test accounts created successfully!');

  } catch (error) {
    console.error('❌ Error creating test accounts:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestAccounts();

