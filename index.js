#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green(`Withdrawal of $ ${amount} successful. Remaining balance $ ${this.balance}`));
        }
        else {
            console.log(chalk.red("Insufficient balance"));
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chalk.green(`Deposit of $ ${amount} successful. Remaining balance $ ${this.balance}`));
    }
    checkBalance() {
        console.log(chalk.yellow(`Current balance $${this.balance}`));
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    phoneNumber;
    account;
    constructor(firstName, lastName, gender, age, phoneNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(1234, 1000),
    new BankAccount(1235, 3000),
    new BankAccount(1236, 5000),
];
const customers = [
    new Customer("Marium", "Usman", "Female", 19, 923498788, accounts[0]),
    new Customer("Anum", "Ahmed", "Female", 22, 9233676766, accounts[1]),
    new Customer("Maaz", "Khan", "Male", 23, 9221343454, accounts[2]),
];
async function bankService() {
    do {
        const userInput = await inquirer.prompt({
            name: "accontNumber",
            type: "number",
            message: "Enter your account number:",
        });
        const customer = customers.find((customer) => customer.account.accountNumber === userInput.accontNumber);
        if (customer) {
            console.log(chalk.yellow(` Welcome! ${customer.firstName} ${customer.lastName}. `));
            const answer = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            if (answer.select == "Deposit") {
                const depositAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit:",
                });
                customer.account.deposit(depositAmount.amount);
            }
            else if (answer.select == "Withdraw") {
                const withdrawAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount you want to withdraw:",
                });
                customer.account.withdraw(withdrawAmount.amount);
            }
            else if (answer.select == "Check Balance") {
                customer.account.checkBalance();
            }
            else if (answer.select == "Exit") {
                console.log(chalk.bgCyan("Exiting bank program...."));
                process.exit();
            }
        }
        else {
            console.log(chalk.redBright("Invalid account number, Please try again"));
        }
    } while (true);
}
bankService();
