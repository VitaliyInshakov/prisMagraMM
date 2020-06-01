import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, ".env")});
import { adjectives, nouns } from "./words";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);

    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }

    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: process.env.SENDGRID_SENDER,
        to: address,
        subject: "Login Secret from PrisMagraMM :)",
        html: `Hello! Your login secret is ${secret}.<br/>Copy paste on the app/website to login`
    };

    return sendMail(email);
};