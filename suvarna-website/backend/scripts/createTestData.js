import prisma from '../lib/prisma.js';

async function createTestData() {
  try {
    // Get buyer
    const buyer = await prisma.user.findUnique({
      where: { email: 'testbuyer@testcompany.com' }
    });

    if (!buyer) {
      console.log('Buyer not found');
      return;
    }

    console.log('Buyer found:', buyer.email, buyer.id);

    // Create test seller
    const seller = await prisma.seller.create({
      data: {
        companyName: 'Solar Power Corporation',
        contactPerson: 'Rajesh Kumar - CEO',
        contactEmail: 'rajesh@solarpowercorp.com',
        contactPhone: '+91-9876543210',
        projectType: 'Solar',
        capacity: 50,
        location: 'Pune',
        state: 'Maharashtra',
        askingPrice: 4.5,
        status: 'active'
      }
    });

    console.log('Seller created:', seller.id);

    // Create match
    const match = await prisma.match.create({
      data: {
        userId: buyer.id,
        sellerId: seller.id,
        status: 'matched'
      },
      include: {
        user: true,
        seller: true
      }
    });

    console.log('Match created:', match.id);
    console.log('Match details:', {
      buyer: match.user.email,
      seller: match.seller.companyName
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestData();

