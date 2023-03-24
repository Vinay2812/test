import mssql from "../connections/mssql-connection.js";
import { DataTypes } from "sequelize";

export const users = mssql.define("users_data", {
    user_id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        field: "userId"
    },
    username:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: DataTypes.STRING(100),
    address: {
        type: DataTypes.STRING(100),
        defaultValue: null,
    },
    phone:{
        type: DataTypes.STRING(10),
        field: "mobile_number",
    }
})

export const user_otp_details = mssql.define("user_otp_data", {
    user_id: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    otp_expiry: {
        type: DataTypes.INTEGER,
    }
})

export const users_data = mssql.define("users_data", {
    userId: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
})
/*
create table user_login(
    userId nvarchar(100) primary key,
    username nvarchar(50) NOT null,
    password nvarchar(100) NOT null,
    address nvarchar(100) DEFAULT NULL,
    mobile_number nvarchar(10),
)
*/