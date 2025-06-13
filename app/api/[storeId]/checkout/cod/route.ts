import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { 
      items,
      customer,
      address,
      phone,
      email
    } = body;

    if (!items || items.length === 0) {
      return new NextResponse("Cart items are required", { status: 400 });
    }

    if (!customer) {
      return new NextResponse("Customer information is required", { status: 400 });
    }

    const storeId = params.storeId;
    
    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
      }
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    // Create or get existing customer
    const existingCustomer = await prismadb.customer.findFirst({
      where: {
        email: customer.email,
        storeId: storeId,
      }
    });

    let customerRecord = existingCustomer;

    if (!existingCustomer) {
      customerRecord = await prismadb.customer.create({
        data: {
          fullName: customer.name,
          email: customer.email,
          phone: customer.phone,
          shippingAddress: customer.address,
          storeId: storeId,
        }
      });
    }

    // Create order with COD payment status
    const order = await prismadb.order.create({
      data: {
        storeId,
        customerId: customer?.id,
        isPaid: false,
        phone: phone || customer.phone,
        email: email || customer.email,
        address: address || customer.address,
        paymentStatus: "cash_on_delivery",
        paymentMethod: "cod",
        orderStatus: "confirmed",
        orderItems: {
          create: items.map((item: any) => ({
            product: {
              connect: {
                id: item.id
              }
            },
            quantity: item.quantity
          }))
        }
      }
    });

    return NextResponse.json({ 
      orderId: order.id,
      message: "Order placed successfully with Cash on Delivery"
    }, {
      status: 200
    });

  } catch (error) {
    console.log('[CHECKOUT_COD_ERROR]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
