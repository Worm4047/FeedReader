/* feedreader.js
*/
$(function() {

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has URL',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            });
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has NAME',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe("string");
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


  // Testing suite of Menu
  describe("The menu", function() {

    // Pre-define elements needed for testing hiding/showing of the menu
    var body = document.body;
    var menuIcon = document.querySelector(".menu-icon-link");

    // Make sure the menu is hidden initially
    it("body has 'menu-hidden' initially", function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // Make sure menu icon toggles hide/show on clicking
    it("body toggles the class 'menu-hidden' on clicking menu icon", function() {
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toEqual(false);
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });
  });

        

    /*  test suite named "Initial Entries" */
    describe('Initial Entries',function(){

        /*  a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */    
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });
        it('check atleast one .entry within .feed',function(done){
            var entries = $('.feed .entry');
            expect(entries.length).not.toBe(0);
            done();
        });

        it('has a entry that has a valid link',function(done){
            var entries = $('.entry-link');
            entries.each(function(idx){
                expect(this.href).toMatch(/^(http|https):\/\//);
            });
            done();
        });
    });


    /* new test suite named "New Feed Selection" */
    describe('New Feed Selection',function(){

        /*  a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */        
         var intialFeed;
         beforeEach(function(done){
            loadFeed(0,function(){
                intialFeed = $('.feed').html();
                loadFeed(1, function(){
                    done();
                });
            });
        });

         it("Ensue change in content",function(done){
         	var newFeed = $('.feed').html();
         	expect(intialFeed).not.toBe(newFeed);
         	done();
         });
    });

}());
