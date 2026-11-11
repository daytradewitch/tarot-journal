# Moon & Paper: a tarot journal

A free tarot journal that runs on GitHub Pages. Each reading is one short text file plus a photo.

## Set it up (about 10 minutes, once)

1. **Make a free GitHub account** at github.com if you don't have one.
2. **Create a repository** named `tarot-journal`. Choose **Public** (Pages is free for public repositories).
3. **Upload these files.** On the new repository's page, choose *uploading an existing file*, then drag in everything from this folder, including the hidden `.github` folder. Press **Commit changes**.
   On a Mac, press Cmd+Shift+. in Finder to see the `.github` folder.
4. **Turn on Pages.** Go to **Settings → Pages**. Under *Build and deployment → Source*, choose **GitHub Actions**.
5. **Edit `_config.yml`** (open it on GitHub, tap the pencil): set `github_repo` to `your-username/tarot-journal` and change `title`, `author` and `look` if you like.
6. After a minute or two your journal is live at `https://your-username.github.io/tarot-journal/`.
   You can follow the progress in the **Actions** tab.

If you named the repository something else, change `baseurl` in `_config.yml` to match, for example `/my-readings`.

## Post a reading (from your phone)

Open your journal and tap **+ Post**:

1. **Upload photo** puts your spread photo into the `photos` folder. Big phone photos are fine: they are shrunk to 1600 px and the location data is removed automatically.
2. **New daily reading** or **New challenge entry** opens a new file already filled in with today's date. Edit it and press **Commit changes**.

A reading file looks like this:

```yaml
---
title: Heavy Monday
category: daily            # daily or challenge
photo: IMG_4021.jpg        # name of the photo you uploaded
question: How do I get through this week?
tags: [work, stress]       # as many as you like
---
Your notes go here.
```

The file name must start with the date: `2026-11-12-anything.md`.

## Tags

Add any tags you like in `tags: [love, career, new moon]`. There's no limit.
Tapping a tag shows every reading with that tag, and the **Tags** page lists them all.
If a tag has a colon in it, put quotes around it: `"11:11"`.

## Monthly challenges

Each challenge is one file in `_challenges/` with a list of prompts (see `november-transformation.md`).
A prompt can be a plain question, or a `theme` plus a `question`.
To answer a prompt, write a reading with `category: challenge`, `challenge: november-transformation` and `day: 5`.
The challenge page ticks off each day you've done and shows your photo next to it.

## Change the look

In `_config.yml`, set `look: moody` (dark), `look: soft` (light) or `look: island` (cozy and bright).
To add another category, add it under `categories_info` and use it in `category:`.

## Cost

Nothing. GitHub Pages and GitHub Actions are free for public repositories, and the 1 GB storage guideline fits thousands of shrunk photos.
Search engines are asked not to list your journal (`hide_from_search: true` in `_config.yml`), so people won't find it by searching.
It is still public: anyone who has the address can read it, so share the link only with people you trust.
