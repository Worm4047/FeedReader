/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has URL',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            });
         })

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has NAME',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe("string");
                expect(feed.name.length).not.toBe(0);
            });
         })
    });


    /* TODO: Write a new test suite named "The menu" */
  // Testing suite of Menu
  describe("The menu", function() {

    // Pre-define elements needed for testing hiding/showing of the menu
    var body = document.body;
    var menuIcon = document.querySelector(".menu-icon-link");

    // Make sure the menu is hidden initially
    it("body has 'menu-hidden' initially", function() {
      expect(body.className).toContain("menu-hidden");
    });

    // Make sure menu icon toggles hide/show on clicking
    it("body toggles the class 'menu-hidden' on clicking menu icon", function() {
      menuIcon.click();
      expect(body.className).not.toContain("menu-hidden");

      menuIcon.click();
      expect(body.className).toContain("menu-hidden");
    });
  });

        

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries',function(){

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */    
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });
        it('check atleast one .entry within .feed',function(done){
            var entries = $('.entry');
            expect(entries.length).not.toBe(0);
            done();
        })

        it('has a entry that has a valid link',function(done){
            var entries = $('.entry-link');
            entries.forEach(function(entryLink){
                expect(entryLink.href).toMatch(/^(http|https):\/\//);
            });
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection',function(){

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */        
         var intialFeed;
         beforeEach(function(done){
            loadFeed(0,function(){
                intialFeed = $('feed').html();
                loadFeed(1, function(){
                    done();
                })
            });
        });

         it("Ensue change in content",function(done){
         	var newFeed = $('.feed').html();
         	expect(initFeed).not.toBe(newFeed);
         	done();
         })
    });

}());
