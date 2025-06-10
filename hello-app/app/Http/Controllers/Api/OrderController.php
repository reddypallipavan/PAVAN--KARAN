<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    // GET /api/orders - Renamed from index to listAllOrders
    public function listAllOrders()
    {
        return response()->json(Order::all(), 200);
    }

    // POST /api/orders - Renamed from store to createNewOrder
    public function createNewOrder(Request $request)
    {
        $request->validate([
            'order_number' => 'required|string|max:255',
            'item_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);
            
        $order = Order::create([
            'order_number' => $request->order_number,
            'item_name' => $request->item_name,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price,
            'status' => $request->status,
        ]);
        return response()->json($order, 201);
    }

    // GET /api/orders/{id} - Renamed from show to fetchOrderById
    public function fetchOrderById($id)
    {
        $order = Order::find($id);
        if (!$order) return response()->json(['message' => 'Order not found'], 404);
        return response()->json($order, 200);
    }
        
    // PUT /api/orders/{id} - Renamed from update to modifyOrder
    public function modifyOrder(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) return response()->json(['message' => 'Order not found'], 404);
    
        $request->validate([
            'order_number' => 'sometimes|string|max:255',
            'item_name' => 'sometimes|string|max:255',
            'quantity' => 'sometimes|integer|min:1',
            'total_price' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|max:255',
        ]);
        
        if ($request->has('order_number')) {
            $order->order_number = $request->order_number;
        }
        if ($request->has('item_name')) {
            $order->item_name = $request->item_name;
        }
        if ($request->has('quantity')) {
            $order->quantity = $request->quantity;
        }
        if ($request->has('total_price')) {
            $order->total_price = $request->total_price;
        }
        if ($request->has('status')) {
            $order->status = $request->status;
        }
        $order->save();
        return response()->json($order, 200);
    }

    // DELETE /api/orders/{id} - Renamed from destroy to removeOrder
    public function removeOrder($id)
    {
        $order = Order::find($id);
        if (!$order) return response()->json(['message' => 'Order not found'], 404); 
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}