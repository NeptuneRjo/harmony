import { Router } from 'express'
import passport from 'passport'
import 'dotenv/config'

const router = Router()

const REDIRECT_URL = process.env.REDIRECT_URL as string

// Login and/or Signup
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
)

router.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
		res.status(200).json({ data: req.user })
	})
})

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/auth/failure',
	}),
	(req, res) => {
		req.session.save(() => {
			res.status(200).redirect(REDIRECT_URL)
		})
	}
)

router.get('/login', (req, res) => {
	res.status(200).json({ data: req.user })
})

router.get('/failure', (req, res) => {
	res.send('something went wrong')
})

export default router
