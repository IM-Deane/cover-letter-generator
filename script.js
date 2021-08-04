import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

// Cache file
const filePath = "cover-letters/templates/template-one.txt";
const rootPath = "cover-letters/generated-letters";
const specifiedExt = ".pdf";

// HELPER FUNCTIONS
export function createNewPDF(newCompany) {
	const doc = new PDFDocument();

	try {
		const data = fs.readFileSync(filePath);
		const resultString = data
			.toString()
			.replace(/_COMPANY_NAME_/gi, newCompany);

		// Create file destination and direct output there
		doc.pipe(
			fs.createWriteStream(
				path.format({
					dir: rootPath,
					name: `cover-letter-${newCompany.toLowerCase()}`,
					ext: specifiedExt,
				})
			)
		);

		// Create PDF contents
		doc.fontSize(14).text(resultString);
		doc.end();
		console.log("Your letter has been created successfully!");
	} catch (err) {
		console.log(err);
	}
}

export function createNewTxt(newCompany) {
	try {
		const data = fs.readFileSync(filePath);
		const resultString = data
			.toString()
			.replace(/_COMPANY_NAME_/gi, newCompany);
		fs.writeFileSync(
			path.format({
				dir: rootPath,
				name: `cover-letter-${newCompany.toLowerCase()}`,
				ext: specifiedExt,
			}),
			resultString
		);
	} catch (err) {
		console.log(err);
	}
}

export function updateName(letterFilePath, newName) {
	fs.rename(letterFilePath, newName, (err) => err && console.log(err));
}

export function deleteLetter(letterFilePath) {
	fs.unlink(letterFilePath, (err) => {
		if (err) throw err;
		console.log("File successfully deleted!");
	});
}

createNewPDF("ZTM");
