// This file has been autogenerated from a class added in the UI designer.

using System;

using Foundation;
using WatchKit;
using Adaptive.ReactiveTrader.Client.Domain.Models;
using UIKit;
using Adaptive.ReactiveTrader.Client.Domain.Models.Execution;
using Adaptive.ReactiveTrader.Client.iOS.Shared;
using System.Diagnostics;

namespace Adaptive.ReactiveTrader.Client.iOSTab.WatchKitExtension
{
	public partial class TradeConfirmController : WKInterfaceController
	{
        public static string Name
        {
            get { return "confirmation"; }
        }

		public TradeConfirmController (IntPtr handle) : base (handle)
		{
		}

        ITrade _trade;

        public override void Awake(NSObject context)
        {
            base.Awake(context);

            if (context == null)
            {
                Console.WriteLine("Error: null context passed to TradeConfirmController Awake");
                return;
            }

            var tradeId = ((NSNumber)context).LongValue;
            var trade = Trades.Shared[tradeId];

            if (trade == null)
            {
                Console.WriteLine("Error: couldn't find trade in TradeConfirmController Awake");
            }

            _trade = trade;
        }


        public override void WillActivate()
        {
            base.WillActivate();

            if (_trade == null)
            {
                Console.WriteLine("Error: trade is null in TradeConfirmController WillActivate");
                return;
            }

            var currency = _trade.CurrencyPair.Replace(_trade.DealtCurrency, "");
            SetTitle(_trade.DealtCurrency + "/" + currency);
            var text = _trade.ToAttributedString();
            DetailsLabel.SetText(text);
        }

        partial void DoneTapped()
        {
            DismissController();
        }
	}
}
