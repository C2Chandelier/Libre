const express = require("express");
const router = express.Router();
const passport = require("passport");
const Joi = require("joi");
const ArticleModel = require("../models/article");
const { ERRORS } = require("../utils");
const { serializeArticle } = require("../utils/serializer");
const { validateId } = require("../utils/validator");
const { canCreateArticle, canModifyArticle } = require("../utils/ROLES");

router.get("/all", passport.authenticate(["user", "admin"], { session: false, failWithError: true }), async (req, res) => {
  try {
    //on recupere tous les articles
    const data = await ArticleModel.find({ deletedAt: { $exists: false } });
    return res.status(200).send({ ok: true, data: data.map((article) => serializeArticle(article, req.user)) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
});

router.get("/:id", passport.authenticate(["user", "admin"], { session: false, failWithError: true }), async (req, res) => {
  try {
    const { error, value: id } = validateId(req.params.id);
    if (error) {
      console.log(error);
      return res.status(400).send({ ok: false, code: ERRORS.INVALID_PARAMS });
    }
    const data = await ArticleModel.findById(id);
    if (!data) return res.status(404).send({ ok: false, code: ERRORS.NOT_FOUND });
    return res.status(200).send({ ok: true, data: serializeArticle(data, req.user) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
});

/* // ici on ne prend que les messages destinés à un role précis
router.get("/", passport.authenticate("referent", { session: false, failWithError: true }), async (req, res) => {
  try {
    if (!canReadAlerteMessage(req.user)) return res.status(403).send({ ok: false, code: ERRORS.OPERATION_UNAUTHORIZED });

    const data = await AlerteMessageModel.find({ to_role: { $in: [req.user.role] }, deletedAt: { $exists: false } });
    if (!data) return res.status(404).send({ ok: false, code: ERRORS.NOT_FOUND });
    return res.status(200).send({ ok: true, data: data.map(serializeAlerteMessage) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
}); */

router.post("/", passport.authenticate(["user", "admin"], { session: false, failWithError: true }), async (req, res) => {
  try {
    const { error, value } = Joi.object({
      theme: Joi.string().required(),
      category: Joi.string().required(),
      title: Joi.string().required(),
      image: Joi.string().required(),
      content: Joi.string().required(),
    }).validate({ ...req.params, ...req.body }, { stripUnknown: true });

    if (error) {
      console.log(error);
      return res.status(400).send({ ok: false, code: ERRORS.INVALID_PARAMS });
    }
    if (!canCreateArticle(req.user)) return res.status(403).send({ ok: false, code: ERRORS.OPERATION_UNAUTHORIZED });

    const { theme, category, title, image, content } = value;
    const user_id = req.user._id;

    if (content.length > 1000) return res.status(400).send({ ok: false, code: ERRORS.INVALID_PARAMS });

    const article = await ArticleModel.create({ user_id, theme, category, title, image, content });

    return res.status(200).send({ ok: true, data: serializeArticle(article, req.user) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
});

router.put("/:id", passport.authenticate(["user", "admin"], { session: false, failWithError: true }), async (req, res) => {
  try {
    const { error, value } = Joi.object({
      id: Joi.string().required(),
      theme: Joi.string().required(),
      category: Joi.string().required(),
      title: Joi.string().required(),
      image: Joi.string().required(),
      content: Joi.string().required(),
    }).validate({ ...req.params, ...req.body }, { stripUnknown: true });

    if (error) {
      console.log(error);
      return res.status(400).send({ ok: false, code: ERRORS.INVALID_PARAMS });
    }
    if (!canModifyArticle(req.user, id)) return res.status(403).send({ ok: false, code: ERRORS.OPERATION_UNAUTHORIZED });

    const { theme, category, title, image, content } = value;

    const article = await ArticleModel.findById(value.id);
    if (!article) return res.status(404).send({ ok: false, code: ERRORS.NOT_FOUND });

    article.set({ theme: theme, category: category, title: title, image: image, content: content });
    await article.save({ fromUser: req.user });
    return res.status(200).send({ ok: true, data: serializeArticle(article, req.user) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
});

router.delete("/:id", passport.authenticate(["user","admin"], { session: false, failWithError: true }), async (req, res) => {
  try {
    const { error, value: id } = validateId(req.params.id);
    if (error) {
      console.log(error);
      return res.status(400).send({ ok: false, code: ERRORS.INVALID_PARAMS });
    }

    if (!canModifyArticle(req.user, id)) return res.status(403).send({ ok: false, code: ERRORS.OPERATION_UNAUTHORIZED });

    const article = await ArticleModel.findById(id);
    if (!article) return res.status(404).send({ ok: false, code: ERRORS.NOT_FOUND });

    const now = new Date();
    article.set({ deletedAt: now });
    await article.save({ fromUser: req.user });

    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
  }
});

module.exports = router;
