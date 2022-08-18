const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Builder, By, Key, until, WebDriver } = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome");
var driver;
let work, addBtn, updateBtn, Clear_btn, addWork, editTitle, deleteWork;

const options = new chrome.Options();
options.addArguments("headless");

describe("WorkList app \n", function () {
  this.timeout(100000);
  before(function (done) {
    driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    driver.get("http://localhost:8001").then(() => {
      done();
    });
  });

  after(function () {
    driver.quit();
  });
  beforeEach(async function () {
    driver.navigate().refresh();
    work = await driver.findElement(By.id("work"));
    cardTitle = await driver.findElement(By.id("cardTitle"));
    addBtn = await driver.findElement(By.id("btnAdd"));
    updateBtn = await driver.findElement(By.id("btnUpdate"));
    Clear_btn = await driver.findElement(By.id("clear"));
    card1Selected = await driver.findElement(By.id("card1Selected"));
    card2Selected = await driver.findElement(By.id("card2Selected"));
    card3Selected = await driver.findElement(By.id("card3Selected"));
    addWork = await driver.findElement(By.id("addWork"));
    editTitle = await driver.findElement(By.id("editTitle"));
    deleteWork = await driver.findElement(By.id("delete"));
  });

  it("Add a work", async function () {
    const editDiv = await driver.executeScript(
      "return getComputedStyle(document.getElementById('edit')).display === 'none'"
    );
    expect(editDiv).to.be.true;
    work.sendKeys("Making Breakfast");
    let messageDisplay = await work.getAttribute("value");
    expect(messageDisplay).to.equal("Making Breakfast");
    await addBtn.click();
    work.sendKeys("Dry Cleaning");
    await addBtn.click();
    await card3Selected.click();
    work.sendKeys("Prepare schema");
    await addBtn.click();
    work.sendKeys("Attend meeting");
    await addBtn.click();
    work.sendKeys("schedule a meeting");
    await addBtn.click();
    await card2Selected.click();
    work.sendKeys("Buy pens, notebook");
    await addBtn.click();
    let messageDisplay1 = await work.getAttribute("value");
    expect(messageDisplay1).to.equal("");
    const ul1 = "document.querySelectorAll('.card1 ul li')";
    const ul2 = "document.querySelectorAll('.card2 ul li')";
    const ul3 = "document.querySelectorAll('.card3 ul li')";
    const expectedOutput = await driver.executeScript(
      `return document.querySelectorAll('.card1 ul li').length === 2 &&
    ${ul1}[0].innerText === "Making Breakfast" &&  ${ul1}[1].innerText === "Dry Cleaning" && document.querySelectorAll('.card3 ul li').length === 3
    ${ul3}[0].innerText === "Prepare schema" && ${ul3}[1].innerText === "Attend meeting" && ${ul3}[2].innerText === "schedule a meeting" && document.querySelectorAll('.card2 ul li').length === 1 && ${ul2}[0].innerText === "Buy pens, notebook"`
    );
    expect(expectedOutput).to.be.true;
  });

  it("Add a work on a empty string", async function () {
    work.sendKeys("Making Breakfast");
    await addBtn.click();
    work.sendKeys("Dry Cleaning");
    work.clear()
    await addBtn.click();
    const ul1 = "document.querySelectorAll('.card1 ul li')";
    const expectedOutput = await driver.executeScript(
      `return document.querySelectorAll('.card1 ul li').length === 1`
    );
    expect(expectedOutput).to.be.true;
  });

  it("Edit", async function () {
    const addDiv1 = await driver.executeScript(
      "return getComputedStyle(document.getElementById('add')).display === 'block'"
    );
    expect(addDiv1).to.be.true;
    work.sendKeys("Making Breakfast");
    let messageDisplay = await work.getAttribute("value");
    expect(messageDisplay).to.equal("Making Breakfast");
    await addBtn.click();
    work.sendKeys("Dry Cleaning");
    await addBtn.click();
    let messageDisplay1 = await work.getAttribute("value");
    expect(messageDisplay1).to.equal("");
    await editTitle.click();
    const addDiv = await driver.executeScript(
      "return getComputedStyle(document.getElementById('add')).display === 'none'"
    );
    expect(addDiv).to.be.true;
    let edit1 = await cardTitle.getAttribute("value");
    expect(edit1).to.equal("Home");
    await card2Selected.click();
    let value2 = await cardTitle.getAttribute("value");
    expect(value2).to.equal("Shopping");
    cardTitle.clear();
    cardTitle.sendKeys("Trip");
    await updateBtn.click();
    const ul1 = "document.querySelectorAll('.card1 ul li')";
    const expectedOutput = await driver.executeScript(
      `return document.querySelectorAll('.card1 ul li').length === 2 &&
      ${ ul1} [0].innerText === "Making Breakfast" && ${ul1} [1].innerText === "Dry Cleaning" && document.querySelector('.card2 h2').innerText === "Trip"`
    );
    expect(expectedOutput).to.be.true;
    const editDiv = await driver.executeScript(
      "return getComputedStyle(document.getElementById('edit')).display === 'none'"
    );
    expect(editDiv).to.be.true;
  });


  it("Edit on empty field", async function () {
    work.sendKeys("Making Breakfast");
    await editTitle.click();
    cardTitle.clear();
    await updateBtn.click();
    const expectedOutput = await driver.executeScript(
      "return document.querySelector('.card1 h2').innerText === 'Home'"
    );
    expect(expectedOutput).to.be.true;
  });

  it("Clear", async function () {
    work.sendKeys("Making Breakfast");
    await addBtn.click();
    work.sendKeys("Dry Cleaning");
    await addBtn.click();
    await card3Selected.click();
    work.sendKeys("Prepare schema");
    await addBtn.click();
    work.sendKeys("Attend meeting");
    await addBtn.click();
    work.sendKeys("schedule a meeting");
    await addBtn.click();
    await card2Selected.click();
    work.sendKeys("Buy pens, notebook");
    await addBtn.click();
    const Output = await driver.executeScript(
      "return document.querySelectorAll('.card1 ul li').length === 2"
    );
    expect(Output).to.be.true;
    await Clear_btn.click();
    const expectedOutput = await driver.executeScript(
      `return document.querySelectorAll('.card1 ul').length === 0 && document.querySelectorAll('.card2 ul').length === 0 && document.querySelectorAll('.card3 ul').length === 0`
    );
    expect(expectedOutput).to.be.true;
  });

  it("Delete", async function () {
    work.sendKeys("Making Breakfast");
    await addBtn.click();
    work.sendKeys("Dry Cleaning");
    await addBtn.click();
    await card3Selected.click();
    work.sendKeys("Prepare schema");
    await addBtn.click();
    work.sendKeys("Attend meeting");
    await addBtn.click();
    work.sendKeys("schedule a meeting");
    await addBtn.click();
    await card2Selected.click();
    work.sendKeys("Buy pens, notebook");
    await addBtn.click();
    await deleteWork.click();
    const addDiv = await driver.executeScript(
      "return getComputedStyle(document.getElementById('add')).display === 'none'"
    );
    expect(addDiv).to.be.true;
    const editDiv = await driver.executeScript(
      "return getComputedStyle(document.getElementById('edit')).display === 'none'"
    );
    expect(editDiv).to.be.true;
    const deleteBtn1 = await driver
      .findElement(By.className("card2"))
      .findElement(By.id("deleteBtn1"));
    await deleteBtn1.click();
    const ul1 = "document.querySelectorAll('.card1 ul li')";
    const ul3 = "document.querySelectorAll('.card3 ul li')";
    const expectedOutput = await driver.executeScript(
      `return document.querySelectorAll('.card1 ul li').length === 2 &&
      ${ ul1} [0].innerText === "Making Breakfast" && ${ul1} [1].innerText === "Dry Cleaning" && document.querySelectorAll('.card3 ul li').length === 3
    ${ ul3} [0].innerText === "Prepare schema" && ${ul3} [1].innerText === "Attend meeting" && ${ul3} [2].innerText === "schedule a meeting" &&
      getComputedStyle(document.querySelector('.card1 #deleteBtn1')).display === "none" && getComputedStyle(document.querySelector('.card3 #deleteBtn1')).display === "none" &&
      getComputedStyle(document.querySelector('.card1 #deleteBtn2')).display === "none" && getComputedStyle(document.querySelector('.card3 #deleteBtn2')).display === "none" &&
      getComputedStyle(document.querySelector('.card3 #deleteBtn3')).display === "none"`
    );
    expect(expectedOutput).to.be.true;
    await card3Selected.click();
    const deleteBtn2 = await driver
      .findElement(By.className("card3"))
      .findElement(By.id("deleteBtn2"));
    await deleteBtn2.click();
    const expectedOutput1 = await driver.executeScript(
      `return document.querySelectorAll('.card1 ul li').length === 2 &&
      ${ ul1} [0].innerText === "Making Breakfast" && ${ul1} [1].innerText === "Dry Cleaning" && document.querySelectorAll('.card3 ul li').length === 2
    ${ ul3} [0].innerText === "Prepare schema" && ${ul3} [2].innerText === "schedule a meeting" &&
      getComputedStyle(document.querySelector('.card3 #deleteBtn1')).display !== "none" && getComputedStyle(document.querySelector('.card1 #deleteBtn1')).display === "none" &&
      getComputedStyle(document.querySelector('.card3 #deleteBtn2')).display !== "none" && getComputedStyle(document.querySelector('.card1 #deleteBtn2')).display === "none"`
    );
    expect(expectedOutput1).to.be.true;
    await editTitle.click();
    const editDiv2 = await driver.executeScript(
      "return getComputedStyle(document.getElementById('edit')).display === 'block' && getComputedStyle(document.getElementById('add')).display === 'none'"
    );
    expect(editDiv2).to.be.true;
    let value1 = await cardTitle.getAttribute("value");
    expect(value1).to.equal("Office");
  });
});
