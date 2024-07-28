//////////////////////////////-----ORDER TYPE-----//////////////////////////////

import z from "zod";

//  ORDER BODY TYPE
export const OrderBody = z.object({
  _id: z.string(),
  sessionToken: z.string(),
  storeId: z.string(),
});
export type OrderBodyType = z.TypeOf<typeof OrderBody>;

//  ORDER RES TYPE
export const OrderRes = z.object({
  data: z.object({
    _id: z.string(),
    phone: z.string(),
    storeId: z.string(),
    address: z.string(),
    isPaid: z.boolean(),
    listProductOrder: z.array(
      z.object({
        // cho nay tra ve 1 mang chua fix
        _id: z.array(
          z.object({
            _id: z.string(),
            images: z.array(z.string()),
            name: z.string(),
            storeId: z.string(),
            arrayPrice: z.array(
              z.object({
                size: z.string(),
                price: z.number(),
                colors: z.array(z.string()),
              })
            ),
            categoryId: z.string(),
            isFeature: z.boolean(),
            isArchive: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        size: z.string(),
        colors: z.array(z.string()),
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type OrderResType = z.TypeOf<typeof OrderRes>;

// ORDER TYPE
export type OrderType = Pick<OrderResType, "data">["data"];

// LIST ORDER BODY TYPE
export const ListOrderBody = z.object({
  storeId: z.string(),
  sessionToken: z.string(),
});
export type ListOrderBodyType = z.TypeOf<typeof ListOrderBody>;

// LIST ORDER RES TYPE
export const ListOrderRes = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      phone: z.string(),
      storeId: z.string(),
      address: z.string(),
      isPaid: z.boolean(),
      listProductOrder: z.array(
        z.object({
          _id: z.array(
            z.object({
              _id: z.string(),
              images: z.array(z.string()),
              name: z.string(),
              storeId: z.string(),
              arrayPrice: z.array(
                z.object({
                  size: z.string(),
                  price: z.number(),
                  colors: z.array(z.string()),
                })
              ),
              categoryId: z.string(),
              isFeature: z.boolean(),
              isArchive: z.boolean(),
              createdAt: z.string(),
              updatedAt: z.string(),
            })
          ),
          size: z.string(),
          colors: z.array(z.string()),
        })
      ),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListOrderResType = z.TypeOf<typeof ListOrderRes>;

//  CREATE ORDER BODY TYPE
///////////////////////////////////////// casi nayf chua chinh
export const CreateOrderBody = z.object({
  storeId: z.string(),
  phone: z.string(),
  address: z.string(),
  isPaid: z.boolean(),
  listProductOrder: z.array(z.string()),
});
export type CreateOrderBodyType = z.TypeOf<typeof CreateOrderBody>;

//  CREATE ORDER RES TYPE
export const CreateOrderRes = z.object({
  data: z.object({
    _id: z.string(),
    phone: z.string(),
    storeId: z.string(),
    address: z.string(),
    isPaid: z.boolean(),
    listProductOrder: z.array(
      z.object({
        // cho nay tra ve 1 mang chua fix
        _id: z.array(
          z.object({
            _id: z.string(),
            images: z.array(z.string()),
            name: z.string(),
            storeId: z.string(),
            arrayPrice: z.array(
              z.object({
                size: z.string(),
                price: z.number(),
                colors: z.array(z.string()),
              })
            ),
            categoryId: z.string(),
            isFeature: z.boolean(),
            isArchive: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        size: z.string(),
        colors: z.array(z.string()),
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateOrderResType = z.TypeOf<typeof CreateOrderRes>;

// DELETE ORDER BODY TYPE
export const DeleteOrderBody = z.object({
  _id: z.string(),
  storeId: z.string(),
});
export type DeleteOrderBodyType = z.TypeOf<typeof DeleteOrderBody>;

/// DELETE ORDER RES TYPE
export const DeleteOrderRes = z.object({
  data: z.object({
    _id: z.string(),
    phone: z.string(),
    storeId: z.string(),
    address: z.string(),
    isPaid: z.boolean(),
    listProductOrder: z.array(
      z.object({
        // cho nay tra ve 1 mang chua fix
        _id: z.array(
          z.object({
            _id: z.string(),
            images: z.array(z.string()),
            name: z.string(),
            storeId: z.string(),
            arrayPrice: z.array(
              z.object({
                size: z.string(),
                price: z.number(),
                colors: z.array(z.string()),
              })
            ),
            categoryId: z.string(),
            isFeature: z.boolean(),
            isArchive: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        size: z.string(),
        colors: z.array(z.string()),
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteOrderResType = z.TypeOf<typeof DeleteOrderRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
