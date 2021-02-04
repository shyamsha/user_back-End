const express = require("express");
const router = express.Router();

const { Contact } = require("../models/contact");

router.get("/contacts", (req, res) => {
  Contact.find()
    .then((contacts) => {
      if (contacts.length != 0) {
        res.send(contacts);
      } else {
        res.send("There are no contacts");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/contacts/:id", (req, res) => {
  const id = req.params.id;
  Contact.findOne({
    _id: id,
  })
    .then((contact) => {
      if (contact) {
        res.send(contact);
      } else {
        res.send("contacts are not found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/contact/create", (req, res) => {
  const body = req.body;
  const contact = new Contact(body);
  contact
    .save()
    .then((contact) => {
      Contact.find().then((contacts) => {
        res.send(contacts);
      });
    })
    .catch((err) => {
      res.send({ error: "Something went wrong please try again" });
    });
});
router.put("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = req.body;
  Contact.findOneAndUpdate(
    {
      _id: id,
    },
    contact,
    function (err, data) {
      if (err) console.log(err);
    }
  )
    .then((contact) => {
      Contact.find().then((contacts) => {
        res.send(contacts);
      });
    })
    .catch((err) => {
      res.send({ error: "Something went wrong please try again" });
    });
});
router.delete("/contacts/delete/:id", (req, res) => {
  const id = req.params.id;
  Contact.findOneAndDelete({
    _id: id,
  })
    .then((contact) => {
      Contact.find().then((contacts) => {
        if (contacts.length != 0) {
          res.send(contacts);
        } else {
          res.send("There are no contacts");
        }
      });
    })
    .catch((err) => {
      res.send({ error: "Something went wrong please try again" });
    });
});

module.exports = {
  contactRouter: router,
};
