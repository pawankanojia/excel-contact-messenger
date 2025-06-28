const ExcelJS = require("exceljs");
const fs = require("fs");
const Contact = require("../models/ContactModel");

exports.parseExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);

    const worksheet = workbook.worksheets[0];
    const requiredHeaders = ["Name", "Address", "Email", "Phone Number"];
    const headers = worksheet.getRow(1).values.slice(1); // Remove first empty element

    // Check for required headers
    for (const header of requiredHeaders) {
      if (!headers.includes(header)) {
        fs.unlinkSync(req.file.path); // Clean up
        return res
          .status(400)
          .json({ message: `Missing required column: ${header}` });
      }
    }

    const data = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header

      const [name, address, email, phone] = row.values.slice(1); // Skip first null
      if (!name || !email || !phone) return; // Basic validation

      data.push({
        name: name.toString(),
        address: address?.toString() || "",
        email: email.toString(),
        phone: phone.toString(),
      });
    });

    fs.unlinkSync(req.file.path); // Delete file after processing

    // Save contacts to MongoDB
    for (const contact of data) {
      try {
        await Contact.updateOne(
          { email: contact.email }, // Use email as unique key
          { $set: contact },
          { upsert: true } // Insert if doesn't exist
        );
      } catch (err) {
        console.error(`Error saving contact ${contact.email}:`, err.message);
      }
    }
    return res.status(200).json({ message: "Parsed successfully", data });
  } catch (err) {
    console.error("Excel parsing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
