;;; package --- Summary

;;; Commentary:
;;; This file runs when Emacs first launches

;;; Code:
(set-face-attribute 'default nil :height 160)

(menu-bar-mode -1)
(tooltip-mode -1)

(defalias 'yes-or-no-p 'y-or-n-p)

(setq inhibit-startup-screen t)
(setq initial-scratch-message "")

(setq make-backup-files nil)

(setq ring-bell-function 'ignore)

(require 'package)

(add-to-list 'package-archives '("melpa" . "http://melpa.org/packages/"))

(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(require 'use-package)

(setq use-package-always-ensure t)

(use-package evil :defer t :init (evil-mode 1))

(use-package diminish :defer t)

(use-package linum-relative
  :defer t
  :init
  (linum-relative-global-mode)
  (setq linum-relative-current-symbol "")
  :diminish linum-relative-mode)

(use-package zerodark-theme
  :defer t
  :init
  (load-theme 'zerodark t)
  (zerodark-setup-modeline-format))

(use-package ivy
  :defer t
  :init
  (ivy-mode 1)
  (setq ivy-use-virtual-buffers t
	enable-recursive-minibuffers t)
  :diminish ivy-mode)

(use-package counsel :defer t)
(use-package counsel-projectile :defer t)

(use-package which-key
  :defer t
  :init (which-key-mode)
  :diminish which-key-mode)

(use-package general :defer t)

(general-define-key
 :states 'normal
 :keymaps '(global dired-mode-map)
 :prefix "SPC"
 "f" 'counsel-find-file
 "F" 'counsel-projectile
 "r" 'counsel-recentf
 "x" 'counsel-M-x
 "S" 'counsel-projectile-ag
 "l" 'swiper
 "w" '(nil :which-key "window")
 "b" '(nil :which-key "buffer")
 "s" 'shell)

(general-define-key
 :states 'normal
 :keymaps '(global dired-mode-map)
 :prefix "SPC w"
 "/" 'split-window-horizontally
 "-" 'split-window-vertically
 "m" 'delete-other-windows
 "h" 'evil-window-left
 "j" 'evil-window-down
 "k" 'evil-window-up
 "l" 'evil-window-right)

(defun kill-other-buffers ()
      "Kill all other buffers."
      (interactive)
      (mapc 'kill-buffer (delq (current-buffer) (buffer-list))))

(general-define-key
 :states 'normal
 :keymaps '(global dired-mode-map)
 :prefix "SPC b"
 "s" 'ivy-switch-buffer
 "l" 'list-buffers
 "o" 'kill-other-buffers
 "k" 'kill-buffer-and-window)

(general-define-key
 :keymaps 'emacs-lisp-mode-map
 :states 'normal
 :prefix ","
 "e" 'eval-defun)

(use-package company
  :defer t
  :init
  (global-company-mode)
  (setq company-idle-delay 0
	company-minimum-prefix 0
	company-tooltip-limit 20)
  :diminish company-mode)

(use-package flycheck
  :defer t
  :init (global-flycheck-mode)
  :diminish flycheck-mode)

(use-package rainbow-delimiters
  :defer t
  :init
  (add-hook 'prog-mode-hook 'rainbow-delimiters-mode)
  (add-hook 'emacs-lisp-mode-hook 'rainbow-delimiters-mode)
  (show-paren-mode 1)
  (setq show-paren-delay 0))

(use-package evil-cleverparens
  :defer t
  :init
  (add-hook 'emacs-lisp-mode-hook #'evil-cleverparens-mode)
  :diminish evil-cleverparens-mode)

(use-package adjust-parens :ensure t)


(use-package aggressive-indent
  :defer t
  :init
  (add-hook 'emacs-lisp-mode-hook #'aggressive-indent-mode))


(use-package smartparens
  :defer t
  :init
  (add-hook 'prog-mode-hook #'smartparens-mode)
  (add-hook 'smartparens-mode-hook
	    #'(lambda ()
		(sp-local-pair 'emacs-lisp-mode "`" nil :actions nil)
		(sp-local-pair 'emacs-lisp-mode "'" nil :actions nil)))
  :diminish smartparens-mode)

(use-package evil-smartparens
  :defer t
  :init
  (add-hook 'emacs-lisp-mode-hook #'evil-smartparens-mode)
  :diminish evil-smartparens-mode)

(general-define-key
 :states '(normal insert)
 :keymaps 'emacs-lisp-mode-map
 "TAB" 'lisp-indent-adjust-parens
 "<backtab>" 'lisp-dedent-adjust-parens)

(use-package elpy
  :defer t
  :init (elpy-enable))

(general-define-key
 :states '(normal visual)
 :keymaps 'python-mode-map
 "e" 'elpy-shell-send-group)

(defun before-save-typescript-hook ()
  "This hook will run before saving a typescript file."
  (when (eq major-mode 'typescript-mode)
    (tide-format-before-save)))

(defun typescript-mode-hook ()
  (tide-setup)
  (tide-hl-identifier-mode 1)
  (tide-mode))

(use-package tide
  :defer t
  :init
  (add-hook 'before-save-hook #'before-save-typescript-hook)
  (add-hook 'typescript-mode-hook #'typescript-mode-hook))

(use-package web-mode
  :defer t
  :init
  (add-to-list 'auto-mode-alist '("\\.html?\\'" . web-mode))
  (add-to-list 'auto-mode-alist '("\\.tsx\\'" . web-mode))
  (add-hook 'web-mode-hook
	    (lambda ()
	      (when (string-equal "tsx" (file-name-extension buffer-file-name))
		(tide-mode))))
  (flycheck-add-mode 'typescript-tslint 'web-mode))

;; If you edit it by hand, you could mess it up, so be careful.
;; Your init file should contain only one such instance.
;; If there is more than one, they won't work right.
'(package-selected-packages
  (quote
   (elpy aggressive-indent adjust-parens evil-cleverparens rainbow-delimiters company general which-key counsel-projectile counsel ivy zerodark-theme linum-relative diminish evil use-package)))

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

(provide 'init)
;;; init.el ends here


(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages
   (quote
    (web-mode zerodark-theme which-key use-package tide rainbow-delimiters linum-relative general evil-smartparens evil-cleverparens elpy diminish counsel-projectile aggressive-indent adjust-parens))))
