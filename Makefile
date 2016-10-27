.PHONY: deploy serve

deploy:
	bundle exec middleman deploy -b

serve:
	bundle exec middleman serve
