import { mailjet, mailjetClient } from "app/utils/getMailjet";
import { Contact, LibraryResponse } from "node-mailjet";

export const createMailjetContact = async (email: string, name?: string) => {
  let body: Contact.PostContactBody = {
    IsExcludedFromCampaigns: false,
    Email: email,
  }

  if (name) {
    body = {
      IsExcludedFromCampaigns: false,
      Name: name,
      Email: email,
    };
  }

  try {
    const contact: LibraryResponse<Contact.GetContactResponse> =
      await mailjet.post("contact").request(body);
    const contactId = contact?.body?.Data[0]?.ID;

    if (contactId) {
      return mailjetClient
        .post("contact")
        .id(contactId)
        .action("managecontactslists")
        .request({
          ContactsLists: [
            {
              ListID: 10251087, //Subscribers list
              Action: "addnoforce",
            },
          ],
        });
    }
  } catch (err) {
    console.log("User not added to email list", err);
  }
};