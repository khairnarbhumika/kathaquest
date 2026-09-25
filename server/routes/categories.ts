import { Router } from 'express';
import { query } from '../db/index.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const categoriesRes = await query(
      `SELECT slug, name, content_type as "contentType", description, display_order as "displayOrder"
       FROM content_categories
       ORDER BY display_order ASC`
    );

    // Get question and lesson counts per category
    const countsRes = await query(
      `SELECT category_slug, COUNT(*) as count FROM quiz_questions GROUP BY category_slug`
    );
    const countMap: Record<string, number> = {};
    countsRes.rows.forEach((r) => {
      countMap[r.category_slug] = parseInt(r.count, 10);
    });

    const categories = categoriesRes.rows.map((cat) => ({
      ...cat,
      questionCount: countMap[cat.slug] || 0,
    }));

    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

export default router;
