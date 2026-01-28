"""
Model Training Script
Trains intent detection and sentiment analysis models using sample data
"""
import json
import os
import pickle
from pathlib import Path
from collections import defaultdict
import math

class IntentTrainer:
    def __init__(self):
        self.intent_vocabularies = defaultdict(set)
        self.intent_counts = defaultdict(int)
        self.idf_scores = {}
        
    def train(self, examples):
        """Train intent classifier on examples"""
        print("[Training] Intent Detector...")
        
        # Build vocabularies per intent
        for example in examples:
            intent = example['intent']
            text = example['text'].lower()
            words = text.split()
            
            self.intent_vocabularies[intent].update(words)
            self.intent_counts[intent] += 1
        
        # Calculate IDF scores
        total_docs = len(examples)
        for intent, words in self.intent_vocabularies.items():
            for word in words:
                docs_with_word = sum(1 for ex in examples 
                                     if word in ex['text'].lower())
                if docs_with_word > 0:
                    self.idf_scores[word] = math.log(total_docs / docs_with_word)
        
        print(f"✓ Trained on {total_docs} intent examples")
        print(f"✓ Intents: {list(self.intent_vocabularies.keys())}")
        return self
    
    def save(self, path='models/intent_model.pkl'):
        """Save trained model"""
        Path('models').mkdir(exist_ok=True)
        with open(path, 'wb') as f:
            pickle.dump({
                'vocabularies': dict(self.intent_vocabularies),
                'counts': dict(self.intent_counts),
                'idf_scores': self.idf_scores
            }, f)
        print(f"✓ Model saved to {path}")

class SentimentTrainer:
    def __init__(self):
        self.positive_words = set()
        self.negative_words = set()
        self.neutral_words = set()
        
    def train(self, examples):
        """Train sentiment analyzer"""
        print("[Training] Sentiment Analyzer...")
        
        for example in examples:
            text = example['text'].lower()
            sentiment = example['sentiment']
            emotion = example['emotion']
            words = text.split()
            
            if sentiment > 0.5:
                self.positive_words.update(words)
            elif sentiment < -0.5:
                self.negative_words.update(words)
            else:
                self.neutral_words.update(words)
        
        print(f"✓ Trained on {len(examples)} sentiment examples")
        print(f"✓ Positive vocabulary: {len(self.positive_words)} words")
        print(f"✓ Negative vocabulary: {len(self.negative_words)} words")
        print(f"✓ Neutral vocabulary: {len(self.neutral_words)} words")
        return self
    
    def save(self, path='models/sentiment_model.pkl'):
        """Save trained model"""
        Path('models').mkdir(exist_ok=True)
        with open(path, 'wb') as f:
            pickle.dump({
                'positive_words': self.positive_words,
                'negative_words': self.negative_words,
                'neutral_words': self.neutral_words
            }, f)
        print(f"✓ Model saved to {path}")

def main():
    print("\n" + "="*60)
    print("VOICEBOT NLU MODEL TRAINING")
    print("="*60 + "\n")
    
    # Load training data
    with open('training_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    intent_examples = data['training_examples']
    sentiment_examples = data['sentiment_examples']
    
    # Train intent detector
    intent_trainer = IntentTrainer()
    intent_trainer.train(intent_examples)
    intent_trainer.save()
    
    # Train sentiment analyzer
    sentiment_trainer = SentimentTrainer()
    sentiment_trainer.train(sentiment_examples)
    sentiment_trainer.save()
    
    print("\n" + "="*60)
    print("✅ TRAINING COMPLETE!")
    print("="*60)
    print("\nModels saved in 'models/' directory:")
    print("  • intent_model.pkl")
    print("  • sentiment_model.pkl")
    print("\nYour models are now ready to use!\n")

if __name__ == '__main__':
    main()
