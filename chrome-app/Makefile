# Configs
BUILDDIR=build
ZIPFILE=cobit-chrome-extension.zip

INCLUDE=$(shell cat ./include)
INITIAL=./initial.js
BASE=$(CURDIR)


all: $(ZIPFILE)

dir:
	rm -rf $(BUILDDIR)
	mkdir -p $(BUILDDIR)
	cp manifest.json $(BUILDDIR)/manifest.json
	cp -vf $(INITIAL) $(BUILDDIR)

files:
	cd ../www && rsync -rLRv --exclude-from $(BASE)/exclude $(INCLUDE) $(BASE)/$(BUILDDIR) && cd -
	cd .. && rsync -rLRv ./bower_components/trezor-connect/chrome/* $(BASE)/$(BUILDDIR)/ && cd -


$(ZIPFILE): dir files
	cd $(BUILDDIR)
	rm -f $(ZIPFILE)
	# use grunt-contrib-compress, patched for reproducibility
	../node_modules/.bin/grunt compress:chrome

	@echo "** The Chrome Extension is ready at cobit-chrome-extension.zip"
