import Mailjet, { Client } from "node-mailjet";
import { Contact, LibraryResponse } from "node-mailjet";

const mailjet = new Mailjet({
	apiKey: process.env.MJ_APIKEY_PUBLIC,
	apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

const mailjetClient = new Client({
	apiKey: process.env.MJ_APIKEY_PUBLIC,
	apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

export const createMailjetContact = async (email: string, name?: string) => {
	let body: Contact.PostContactBody = {
		IsExcludedFromCampaigns: false,
		Email: email,
	};

	if (name) {
		body = {
			IsExcludedFromCampaigns: false,
			Name: name,
			Email: email,
		};
	}

	try {
		const contact: LibraryResponse<Contact.GetContactResponse> = await mailjet
			.post("contact")
			.request(body);
		const contactId = contact?.body?.Data[0]?.ID;

		if (contactId) {
			return mailjetClient
				.put("contact")
				.id(contactId)
				.action("managecontactslists")
				.request({
					ContactsLists: [
						{
							ListID: 10251087, //Subscribers list
							Action: "addforce",
						},
					],
				});
		}
	} catch (err) {
		console.log("User not added to email list", err);
	}
};
