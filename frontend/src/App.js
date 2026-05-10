import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ================= PAGES =================

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AddMenu from "./pages/AddMenu";
import VendorOrders from "./pages/VendorOrders";
import AddCategories from "./pages/ManageCategories";

import MenuList from "./pages/MenuList";
import CartPage from "./pages/Cart";
import MyOrders from "./pages/MyOrders";

import ManageUsers from "./pages/ManageUsers";
import AssignedOrders from "./pages/AssignedOrders";

// ================= COMPONENTS =================

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <>

            {/* ================= TOAST ================= */}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />

            {/* ================= ROUTER ================= */}

            <BrowserRouter>

                <Routes>

                    {/* =======================================================
                        PUBLIC ROUTES
                    ======================================================= */}

                    <Route
                        path="/"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />


                    {/* =======================================================
                        COMMON PROTECTED ROUTES
                    ======================================================= */}

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />


                    {/* =======================================================
                        ADMIN ROUTES
                    ======================================================= */}

                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute role="ADMIN">
                                <ManageUsers />
                            </ProtectedRoute>
                        }
                    />


                    {/* =======================================================
                        VENDOR ROUTES
                    ======================================================= */}

                    <Route
                        path="/vendor/add-menu"
                        element={
                            <ProtectedRoute role="VENDOR">
                                <AddMenu />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/vendor/menus"
                        element={
                            <ProtectedRoute role="VENDOR">
                                <AddMenu />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/vendor/orders"
                        element={
                            <ProtectedRoute role="VENDOR">
                                <VendorOrders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/vendor/categories"
                        element={
                            <ProtectedRoute role="VENDOR">
                                <AddCategories />
                            </ProtectedRoute>
                        }
                    />


                    {/* =======================================================
                        CUSTOMER ROUTES
                    ======================================================= */}

                    <Route
                        path="/menu"
                        element={
                            <ProtectedRoute role="CUSTOMER">
                                <MenuList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute role="CUSTOMER">
                                <CartPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute role="CUSTOMER">
                                <MyOrders />
                            </ProtectedRoute>
                        }
                    />



                     {/* =======================================================
                        DELIVERY ROUTES
                    ======================================================= */}

                        <Route
                    path="/delivery/orders"
                    element={
                        <ProtectedRoute role="DELIVERY">
                            <AssignedOrders />
                        </ProtectedRoute>
                    }
                />

                </Routes>

            </BrowserRouter>

        </>

    );
}

export default App;