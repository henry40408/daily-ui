.PHONY: build deploy serve

build:
	bundle exec middleman build

deploy:
	bundle exec middleman deploy -b

serve:
	bundle exec middleman serve
