const MessageTemplate = require('../models/MessageTemplateModel');

exports.createTemplate = async (req, res) => {
  try {
    const template = await MessageTemplate.create(req.body);
    res.status(201).json({ message: 'Template saved', template });
  } catch (err) {
    res.status(500).json({ message: 'Error saving template', error: err.message });
  }
};

exports.getTemplates = async (req, res) => {
  const { type } = req.query;
  const query = type ? { type } : {};
  const templates = await MessageTemplate.find(query).sort({ updatedAt: -1 });
  res.status(200).json(templates);
};

exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MessageTemplate.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    await MessageTemplate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
