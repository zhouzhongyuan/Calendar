var MonthView = Backbone.View.extend({
    el: $('#container'),
    // template which has the placeholder 'who' to be substitute later
    template: _.template("<h3>Hello <%= who %></h3>"),
    initialize: function () {
        this.render();
    },
    render: function () {
        // render the function using substituting the varible 'who' for 'world!'.
        this.$el.html(this.template({ who: 'world!' }));
        //***Try putting your name instead of world.
    }
});

var appView = new MonthView();



// App.Views.Month = Backbone.View.extend({
//     template: JST.month,
//     render: function () {
//         this.el.innerHTML = this.template(this.model.toJSON());
//         var weeks = this.model.get('weeks');
//         for (var i = 0; i < weeks; i++) {
//             this.$("tbody").append(new App.Views.WeekRow({
//                 week  : i,
//                 model : this.model,
//                 collection: this.collection
//             }).render().el);
//         }
//         return this;
//     }
// });

var WeekRowMonth = Backbone.View.extend({
    el: $('#container'),
    initialize: function (options) {
        if (options) {
            this.week = options.week;
        }
    },
    render: function () {
        var month = this.model;

        if (this.week === 0) {
            var firstDay = month.moment().day();
            for (var i = 0; i < firstDay; i++) {
                this.$el.append("<td>");
            }
        }

        month.weekDates(this.week).forEach(function (date) {
            date = month.moment().date(date);
            this.$el.append(new DayCellView({
                model: date,
                collection: this.collection.onDate(date)
            }).render().el);
        }, this);

        return this;
    }
});

var DayCellView = Backbone.View.extend({
    el: $('#container'),
    template: _.template(
        '<span class="date"><%= num %></span>\
        <ul>\
            <% titles.forEach(function (title) { %>\
                <li><%= title %></li>\
                <% }); %>\
        </ul>'
    ),
    // template: _.template("<h3>Hello <%= num %></h3>"),

    initialize: function () {
        this.render();
    },
    render: function () {
        this.el.innerHTML = this.template({ 
            num: 10,
            titles: ['默认']
        });
        console.log(this.el);
        return this;
    },
});
var appView = new DayCellView();
console.log(appView);